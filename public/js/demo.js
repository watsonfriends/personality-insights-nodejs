/**
 * Copyright 2015 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/* global $, TextSummary, _, hljs, TWITTER_USER */
'use strict';

var teamMembersLoaded = false;

var team = [
    {
        id: "Oprah",
        lang: "en",
        imagePath: "/images/twitter/oprah.png"
    },
    {
        id: "KingJames",
        lang: "en",
        imagePath: "/images/twitter/kingjames.jpg"
    },
    {
        id: "DonFranciscoTV",
        lang: "es",
        imagePath: "/images/twitter/DonFranciscoTV.jpg"
    },
    {
        id: "pontifex_es",
        lang: "es",
        imagePath: "/images/twitter/pontifex_es.jpg"
    }
];

var teamAverage = undefined;

var teamHead = d3.select("#team-table-body")

var candidates = [
    {
        id: "trikaOfficial",
        lang: "ar",
        imagePath: "/images/twitter/trikaofficial.jpg"
    },
    {
        id: "faridyu",
        lang: "ja",
        imagePath: "/images/twitter/faridyu.jpg"
    },
    {
        id: "Krungy21",
        lang: "ko",
        imagePath: "/images/twitter/Krungy21.jpg"
    }
];

var candidateHead = d3.select("#candidate-table-body")

var markdown = function(s) {
  return window.markdownit().render(s);
};

var OUTPUT_LANG = 'en';

var globalState = {
  twitterUserId: undefined,
  selectedTwitterUser: undefined,
  selectedTwitterImage: undefined,
  selectedTwitterUserLang: undefined,
  selectedSample: undefined,
  languageSelected: undefined,
  currentProfile: undefined,
  userLocale: undefined
};

var QUERY_PARAMS = (function(a) {
  if (a == '')
    return {};
  var b = {};
  for (var i = 0; i < a.length; ++i) {
    var p = a[i].split('=', 2);
    if (p.length == 1)
      b[p[0]] = '';
    else
      b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, ' '));
  }
  return b;
})(window.location.search.substr(1).split('&'));

function getBrowserLang() {
  if (navigator.languages != undefined)
    return navigator.languages[0];
  else
    return navigator.language;
}

function getBrowserLangNoLocale() {
  var lang = getBrowserLang();
  return lang.substring(0, 2);
}

function extend(target, source) {
  Object.keys(source).forEach(function(k) {
    target[k] = source[k];
  });
  return target;
}

function clone(o) {
  return extend({}, o);
}

function replaces(s, replaces) {
  var out = s;
  replaces.forEach(function(r) {
    out = out.replace(r.search, r.replace);
  });

  return out;
}

function renderMarkdown(s) {
  return replaces(markdown(s || ''), [
    {
      search: /\<\a /g,
      replace: '<a class="base--a" target="_blank" '
    }
  ]);
}

function profile_summary(profile){
    var summary = {
        personality: {
            big5: {},
            facets: {}
        },
        needs: {},
        values: {},
        consumption_preferences: {},
    };
    
    for (var big5 of profile.personality){
        summary.personality.big5[big5.name] = big5.percentile;
        summary.personality.facets[big5.name] = {};
        for (var facet of big5.children){
            summary.personality.facets[big5.name][facet.name] = facet.percentile;
        }
    }
    
    for (var need of profile.needs){
        summary.needs[need.name] = need.percentile;
    }
    
    for (var value of profile.values){
        summary.values[value.name] = value.percentile;
    }
    
    for (var category of profile.consumption_preferences){
        summary.consumption_preferences[category.name.substring(0, category.name.length - 12)] = {};
        for (var preference of category.consumption_preferences){
            summary.consumption_preferences[category.name.substring(0, category.name.length - 12)][preference.name] = preference.score;
        }     
    }
    
    return summary;
}

function averageProfileSummaries(summaries){
    console.log("Initial Summary", summaries[0]);
    var average = JSON.parse(JSON.stringify(summaries[0]));
    for (var i = 1; i < summaries.length; i++){
        for (var trait in average.personality.big5){
            average.personality.big5[trait] += summaries[i].personality.big5[trait];
        }
        for (var trait in average.personality.facets){
            for (var facet in average.personality.facets[trait]){
                average.personality.facets[trait][facet] += summaries[i].personality.facets[trait][facet];
            }
        }
        for (var need in average.needs){
            average.needs[need] += summaries[i].needs[need];
        }
        for (var value in average.values){
            average.values[value] += summaries[i].values[value]
        }
        for (var category in average.consumption_preferences){
            for (var preference in average.consumption_preferences[category]){
                average.consumption_preferences[category][preference] += summaries[i].consumption_preferences[category][preference];
            }
        }
    }
    
    for (var trait in average.personality.big5){
            average.personality.big5[trait] /= summaries.length;
        }
        for (var trait in average.personality.facets){
            for (var facet in average.personality.facets[trait]){
                average.personality.facets[trait][facet] /= summaries.length;
            }
        }
        for (var need in average.needs){
            average.needs[need] /= summaries.length;
        }
        for (var value in average.values){
            average.values[value] /= summaries.length;
        }
        for (var category in average.consumption_preferences){
            for (var preference in average.consumption_preferences[category]){
                average.consumption_preferences[category][preference] /= summaries.length;
            }
        }
    return average;
}

function summary_match(summaryA, summaryB){
    var diff = {
        personality: 0,
        needs: 0,
        values: 0,
        consumption_preferences: 0
    };
    
    var personalityCount = 0;
    for (var trait in summaryA.personality.big5){
        diff.personality += Math.abs(summaryA.personality.big5[trait] - summaryB.personality.big5[trait]);
        personalityCount++;
    }
    for (var trait in summaryA.personality.facets){
        for (var facet in summaryA.personality.facets[trait]){
            diff.personality += Math.abs(summaryA.personality.facets[trait][facet] - summaryB.personality.facets[trait][facet]);
            personalityCount++;
        }
    }
    
    diff.personality = 1 - diff.personality / personalityCount;
    
    var needCount = 0;
    for (var need in summaryA.needs){
        diff.needs += Math.abs(summaryA.needs[need] - summaryB.needs[need]);
        needCount++;
    }
    
    diff.needs = 1 - diff.needs / needCount;
    
    var valueCount = 0;
    for (var value in summaryA.values){
        diff.values += Math.abs(summaryA.values[value] - summaryB.values[value]);
        valueCount++;
    }
    
    diff.values = 1 - diff.values / valueCount;
    
    
    var preferencesCount = 0;
    for (var category in summaryA.consumption_preferences){
        for (var preference in summaryA.consumption_preferences[category]){
            diff.consumption_preferences += Math.abs(summaryA.consumption_preferences[category][preference] - summaryB.consumption_preferences[category][preference]);
            preferencesCount++;
        }     
    }
    diff.consumption_preferences = 1 - diff.consumption_preferences / preferencesCount;
    
    return diff;
}

var people = [];
var person1 = undefined, person2 = undefined;

$(document).ready(function() {

  var SAMPLE_TEXTS = [ 'sample1', 'sample2', 'sample3', 'ar', 'ja'];
  var textCache = {};

  globalState.selectedSample = SAMPLE_TEXTS[0];
  globalState.languageSelected = undefined;

  var $big5Traits = $('.output-big-5--traits');
  var $needsTraits = $('.output-needs--traits');
  var $needsMoreTraits = $('.output-needs--more-traits');
  var $valuesTraits = $('.output-values--traits');
  var $needsToggle = $('.output-needs--toggle');
  var $outputSummaryText = $('.output-summary--summary');
  var $inputTextArea = $('.input--text-area');
  var $inputWordCount = $('.input--word-count-number');
  var $inputForm1 = $('.input--form1');
  var $inputForm2 = $('.input--form2');
  var $resetButton = $('.input--reset-button');
  var $loading = $('.loading');
  var $output = $('.output');
  var $outputHeader = $('.output--header');
  var $outputJSON = $('.output--json');
  var $outputJSONCode = $('.output--json-code');
  var $outputJSONButton = $('.output--json-button');
  var $error = $('.error');
  var $errorMessage = $('.error--message');

  // Instantiate external PI modules
  const TraitNames = new PersonalityTraitNames({
    version : 'v3',
    locale : globalState.userLocale || OUTPUT_LANG
  });

  const TraitDescriptions = new PersonalityTraitDescriptions({
    version: 'v3',
    locale: globalState.userLocale || OUTPUT_LANG,
    format: 'markdown'
  });

  const ConsumptionPreferences = new PersonalityConsumptionPreferences({
    version: 'v3',
    locale: globalState.userLocale || OUTPUT_LANG
  });



  function setTextSample(value, readonly) {
    $('#inputText').val(value);
    if (readonly) {
      $('#inputText').attr('readonly', 'readonly');
    } else {
      $('#inputText').removeAttr('readonly');
    }
  }

  function setLoadingState() {
    resetOutputs();
    $loading.show();
    scrollTo($loading);
  }

  function loadTwitterUser(twitterHandle, options) {
    setLoadingState();
    getProfileForTwitterUser(twitterHandle, options);
  }

  function registerHandlers() {
    globalState.userLocale = getBrowserLangNoLocale();

    $('input[name="text-lang"]').click(function() {
      globalState.selectedLanguage = $(this).attr('value');
    });

    $('input[name="text-sample"]').click(function() {
      var textFile = $(this).attr('data-file'),
        orientation = $(this).attr('data-orientation');
      globalState.selectedSample = textFile;

      if (orientation === 'right-to-left') {
        $inputTextArea.removeClass('left-to-right');
        $inputTextArea.addClass('right-to-left');
      } else {
        $inputTextArea.removeClass('right-to-left');
        $inputTextArea.addClass('left-to-right');
      }

      $('#languageChooser').hide();

      loadSampleText(textFile);
      updateWordCount();
    });

    $(window).resize(function() {
      if ($(window).width() < 800) {
        $('.smartphone-hidden').hide();
        if (globalState.selectedSample == 'custom') {
          $('input[name="text-sample"]:first').trigger('click');
        }
      } else {
        $('label[for="text-custom"]').show();
      }
    });

    $('input#text-custom').unbind('click').click(function() {
      globalState.selectedSample = 'custom';

      $inputTextArea.removeClass('right-to-left');
      $inputTextArea.addClass('left-to-right');

      $('#languageChooser').show();
      setTextSample('', false);
      updateWordCount();

      if (!globalState.selectedLanguage) {
        $('input#lang-en').trigger('click');
      }
    });

    $('input[name="twitter"]').click(function() {
      var twitterId = $(this).val();
      var twitterLang = $(this).attr('data-lang');
      globalState.selectedTwitterUser = twitterId;
      globalState.selectedTwitterImage = $('label[for="' + $(this).attr('id') + '"] img').attr('src');
      globalState.selectedTwitterUserLang = twitterLang;
    });
      
    $('input[name="twitter"]').each(function(){
        twitterIDs.push(this.value);
    })

    $inputForm1.submit(function(e) {
      e.cancelBubble = true;
      e.preventDefault();
      if (e.stopPropagation)
        e.stopPropagation();

      enableAnalyzeButtons(false);
      loadTwitterUser(globalState.selectedTwitterUser, {
        language: globalState.selectedTwitterUserLang
      });
    });

    $inputForm2.submit(function(e) {
      e.cancelBubble = true;
      e.preventDefault();
      if (e.stopPropagation)
        e.stopPropagation();

      enableAnalyzeButtons(false);
      var lang = globalState.selectedSample == 'custom'
        ? globalState.selectedLanguage
        : $('input#text-' + globalState.selectedSample).attr('data-lang');

      setLoadingState();

      getProfileForText($('.input--text-area').val(), {language: lang});
    });
  }

  function setTextSummary(profile) {
    var textSummary = new TextSummary({ version: 'v3', locale: globalState.userLocale || OUTPUT_LANG});
    var summary = textSummary.getSummary(profile);
    $('#personalitySummary').empty();
    $('#personalitySummary').append('<p class="base--p">' + summary.split('\n').join('</p><p class="base--p">') + '</p>');
  }

  /**
   * Toggle Big 5 Subtraits
   */
  $(document).on('click', '.output-big-5--trait-label', function() {
    $(this).closest('.percent-bar-and-score').toggleClass('toggled');
  });

  $resetButton.click(function() {
    $('input[name="twitter"]:first').trigger('click');
    $('input[name="text-sample"]:first').trigger('click');
    $('.tab-panels--tab:first').trigger('click');
    $('#your-twitter-panel .auth-form').show();
    $('#your-twitter-panel .analysis-form').hide();
    resetOutputs();
    selectDefaultLanguage();
  });

  // toggleNeedsTraits
  $needsToggle.click(function() {
    $needsMoreTraits.toggle();
    $needsToggle.text($needsToggle.text() == '<<' ? '>>' : '<<');
  });

  $outputJSONButton.click(function() {
    $outputJSON.toggle();
    scrollTo($outputJSON);
  });

  function getProfileForTwitterUser(userId, options) {
    getProfile(userId, extend(options || {}, { source_type: 'twitter' }));
  }

  function getProfileForText(text, options) {
    getProfile(text, extend(options || {}, {source_type: 'text'}));
  }


  /**
  * Localization
  */
  function replacementsForLang(lang) {
    var replacements = {
      'en': {
        'Extraversion': 'Introversion/Extraversion',
        'Outgoing': 'Warmth',
        'Uncompromising': 'Straightforwardness',
        'Immoderation': 'Impulsiveness',
        'Susceptible to stress': 'Sensitivity to stress',
        'Conservation': 'Tradition',
        'Openness to change': 'Stimulation',
        'Hedonism': 'Taking pleasure in life',
        'Self-enhancement': 'Achievement',
        'Self-transcendence': 'Helping others'
      },
      'ja': {
        'Openness': '知的好奇心',
        'Friendliness': '友好性'
      }
    };

    return replacements[lang] || {};
  }

  function getErrorMessage(error) {
    var message = GENERIC_REQUEST_ERROR;
    if (error.responseJSON && error.responseJSON.error) {
      message = error.responseJSON.error.error;
    } else if (error.responseJSON && error.responseJSON.message) {
      message = error.responseJSON.message
    }
    return message;
  }

  function defaultProfileOptions(options) {
    var defaults = extend({
      source_type: 'text',
      accept_language: globalState.userLocale || OUTPUT_LANG,
      include_raw: false,
      consumption_preferences: true
    }, options || {});

    if (defaults.source_type !== 'twitter') {
      defaults = extend({
        language: globalState.userLocale || OUTPUT_LANG
      }, defaults);
    }
    return defaults;
  }

  function enableAnalyzeButtons(value) {
    $('.input--submit-button1').prop('disabled', !value);
    $('.input--submit-button2').prop('disabled', !value);
  }

  function getProfile(data, options) {
    options = defaultProfileOptions(options);

    var payload = clone(options),
      url = '/api/profile/' + options.source_type;

    if (options.source_type === 'twitter')
      payload.userId = data;
    else
      payload.text = data;

    
  }

  /**
  * cpIdMapping returns the description for a consumption_preference_id
  * Uses the personality-consumption-preferences npm module
  */
  function cpIdMapping(consumption_preference_id) {
    return ConsumptionPreferences.description(consumption_preference_id);
  }

  function cpIdSortingLikely(cpid, lang) {
     var sortArray;
     if(lang == 'en') sortArray = enSortLikely;
     if(lang == 'es') sortArray = esSortLikely;
     if(lang == 'ja') sortArray = jaSortLikely;
     if(lang == 'ar') sortArray = arSortLikely;
     if(lang == 'ko') sortArray = koSortLikely;
     return sortArray.indexOf(cpid);
  }

  function cpIdSortingUnlikely(cpid, lang) {
     var sortArray;
     if(lang == 'en') sortArray = enSortUnlikely;
     if(lang == 'es') sortArray = esSortUnlikely;
     if(lang == 'ja') sortArray = jaSortUnlikely;
     if(lang == 'ar') sortArray = arSortUnlikely;
     if(lang == 'ko') sortArray = koSortUnlikely;
     return sortArray.indexOf(cpid);
  }

  var consumptionPrefMusic = new Set([
    'consumption_preferences_music_rap',
    'consumption_preferences_music_country',
    'consumption_preferences_music_r_b',
    'consumption_preferences_music_hip_hop',
    'consumption_preferences_music_live_event',
    'consumption_preferences_music_playing',
    'consumption_preferences_music_latin',
    'consumption_preferences_music_rock',
    'consumption_preferences_music_classical'
  ]);

  var consumptionPrefMovie = new Set([
    'consumption_preferences_movie_romance',
    'consumption_preferences_movie_adventure',
    'consumption_preferences_movie_horror',
    'consumption_preferences_movie_musical',
    'consumption_preferences_movie_historical',
    'consumption_preferences_movie_science_fiction',
    'consumption_preferences_movie_war',
    'consumption_preferences_movie_drama',
    'consumption_preferences_movie_action',
    'consumption_preferences_movie_documentary'
  ]);

  function addIfAllowedReducer(accumulator, toadd) {
    if (consumptionPrefMusic.has(toadd.cpid)) {
      if (accumulator.reduce(function(k, v) {
        return consumptionPrefMusic.has(v.cpid)
          ? k + 1
          : k;
      }, 0) < 1) {
        accumulator.push(toadd);
      }
    } else if (consumptionPrefMovie.has(toadd.cpid)) {

      if (accumulator.reduce(function(k, v) {
        return consumptionPrefMovie.has(v.cpid)
          ? k + 1
          : k;
      }, 0) < 1) {
        accumulator.push(toadd);
      }
    } else {
      accumulator.push(toadd);
    }
    return accumulator;
  }

  function sortIdxComparator(x, y) {

    var a = x.idx;
    var b = y.idx;

    if (a < b) {
      return -1;
    }

    if (a > b) {
      return 1;
    }

    if (a === b) {
      return 0;
    }
  }

  function loadConsumptionPreferences(data) {
    var cpsect = $('.output-summary--consumption-behaviors--section');
    var behaviors = $('.output-summary--consumption-behaviors--section');
    var behaviors_likely = $('.output-summary--likely-behaviors');
    var behaviors_unlikely = $('.output-summary--unlikely-behaviors');
    var lang = data.processed_language;

    if (data.consumption_preferences) {
      var likelycps = data.consumption_preferences.reduce(function(k, v) {
        v.consumption_preferences.map(function(child_item) {
          if (child_item.score === 1) {
            k.push({
              name: cpIdMapping(child_item.consumption_preference_id),
              idx: cpIdSortingLikely(child_item.consumption_preference_id,lang),
              cpid: child_item.consumption_preference_id
            });
          }
        });
        return k;
      }, []);

      var unlikelycps = data.consumption_preferences.reduce(function(k, v) {
        v.consumption_preferences.map(function(child_item) {
          if (child_item.score === 0) {
            k.push({
              name: cpIdMapping(child_item.consumption_preference_id),
              idx: cpIdSortingUnlikely(child_item.consumption_preference_id,lang),
              cpid: child_item.consumption_preference_id
            });
          }
        });
        return k;
      },[]);

      behaviors_likely.empty();
      likelycps.sort(sortIdxComparator).reduce(addIfAllowedReducer, []).slice(0, 3).map(function(item) {
        behaviors_likely.append("<div class=\"output-summary--behavior output-summary--behavior_POSITIVE\"><i class=\"icon icon-likely\"></i>" + item.name + "</div>\n");
      });

      behaviors_unlikely.empty();
      unlikelycps.sort(sortIdxComparator).reduce(addIfAllowedReducer, []).slice(0, 3).map(function(item) {
        behaviors_unlikely.append('<div class="output-summary--behavior output-summary--behavior_NEGATIVE"><i class="icon icon-not-likely"></i>' + item.name + '</div>\n');
      });

      behaviors_likely.show();
      behaviors_unlikely.show();
    } else {
      behaviors_likely.hide();
      behaviors_unlikely.hide();
    }
  }


  const replacements = replacementsForLang(globalState.userLocale || OUTPUT_LANG);

  function loadOutput(teamSummaries, candidateSummary) {
    loadWordCount(data);

    // Add wrapped traits data from the user profile into the html
    $big5Traits.append(_.template(big5PercentTemplate.innerHTML, {
      items: wrapTraits(data).sort(sortScores),
      tooltips: function(traitId) {
        return renderMarkdown(TraitDescriptions.description(traitId));
      }
    }));

    // Add wrapped needs data from the specified user profile into the html
    $needsTraits.append(_.template(outputStatsPercentTemplate.innerHTML, {
      items: wrapNeeds(data).sort(sortScores).slice(0, 5),
      tooltips: function(traitId) {
        return renderMarkdown(TraitDescriptions.description(traitId));
      }
    }));

    // Add wrapped needs 'more' data from the specified user profile into the html
    $needsMoreTraits.append(_.template(outputStatsPercentTemplate.innerHTML, {
      items: wrapNeeds(data).sort(sortScores).slice(5, wrapNeeds(data).length),
      tooltips: function(traitId) {
        return renderMarkdown(TraitDescriptions.description(traitId));
      }
    }));

    // Add wrapped values data from the specified user profile into the html
    $valuesTraits.append(_.template(outputStatsPercentTemplate.innerHTML, {
      items: wrapValues(data).sort(sortScores),
      tooltips: function(traitId) {
        return renderMarkdown(TraitDescriptions.description(traitId));
      }
    }));

    // NOTE: v3 update - is this necessary here? - should it be moved elsewhere?
    globalState.currentProfile = data;

  }


  function wrapTraits(data){
    return data.personality.map(function(obj) {
      const traitName = TraitNames.name(obj.trait_id);
      return {
        name: replacements[traitName] ? replacements[traitName] : traitName,
        id: obj.trait_id,
        score: Math.round(obj.percentile * 100),
        children: obj.children.map(function(obj2) {
          const traitName2 = TraitNames.name(obj2.trait_id);
          return {
            name: replacements[traitName2] ? replacements[traitName2] : traitName2,
            id: obj2.trait_id,
            score: Math.round(obj2.percentile * 100)
          }
        }).sort(function(a, b) { return b.score - a.score; })
      }
    });
  }

  function wrapNeeds(data) {
    return data.needs.map(function(obj) {
      const traitName = TraitNames.name(obj.trait_id);
      return {
        id: obj.trait_id,
        name: replacements[traitName] ? replacements[traitName] : traitName,
        score: Math.round(obj.percentile * 100)
      }
    });
  }

  function wrapValues(data) {
    return data.values.map(function(obj) {
      const traitName = TraitNames.name(obj.trait_id);
      return {
        id: obj.trait_id,
        name: replacements[traitName] ? replacements[traitName] : traitName,
        score: Math.round(obj.percentile * 100)
      };
    });
  }


  $inputTextArea.on('propertychange change click keyup input paste', function() {
    updateWordCount();
  });

  function loadWordCount(data) {
    $('.output--word-count-number').text(data.word_count);
    $('.output--word-count-message').removeClass('show');
    if (data.processed_lang === 'en') {
      if (data.word_count >= 3000)
        $('.output--word-count-message_VERY-STRONG_NEW_MODEL').addClass('show');
      else if (data.word_count < 3000 && data.word_count >= 1200)
        $('.output--word-count-message_STRONG_NEW_MODEL').addClass('show');
      else if (data.word_count < 1200 && data.word_count >= 600)
        $('.output--word-count-message_DECENT_NEW_MODEL').addClass('show');
      else
        $('.output--word-count-message_WEAK_NEW_MODEL').addClass('show');
    }
    else {
      if (data.word_count > 6000)
        $('.output--word-count-message_VERY-STRONG').addClass('show');
      else if (data.word_count <= 6000 && data.word_count >= 3500)
        $('.output--word-count-message_STRONG').addClass('show');
      else if (data.word_count < 3500 && data.word_count >= 1500)
        $('.output--word-count-message_DECENT').addClass('show');
      else
        $('.output--word-count-message_WEAK').addClass('show');
    }
  }

  function scrollTo(element) {
      console.log(element);
    $('html, body').animate({
      scrollTop: element.offset().top
    }, 'fast');
  }

  function resetOutputs() {
    $output.hide();
    $error.hide();
    $loading.hide();
    $big5Traits.empty();
    $needsTraits.empty();
    $needsMoreTraits.empty();
    $valuesTraits.empty();
    $('.output-big-5--sub-tree').hide();
    $needsMoreTraits.hide();
    $outputSummaryText.empty();
    $outputJSONCode.empty();
    $outputJSON.hide();
  }


  function sortScores(obj1, obj2) {
    return obj2.score - obj1.score;
  }

  function preloadSampleTexts(callback) {
    var shared = {
      done: 0
    };
    SAMPLE_TEXTS.forEach(function(name) {
      $Q.get('data/text/' + name + '.txt').then(function(text) {
        shared.done = shared.done + 1;
        textCache[name] = text;

        if (shared.done == SAMPLE_TEXTS.length && callback) {
          callback();
        }
      }).done();
    });
  }

  function loadSampleText(name) {
    if (textCache[name]) {
      setTextSample(textCache[name], true);
      updateWordCount();
    } else {
      $Q.get('data/text/' + name + '.txt').then(function(text) {
        setTextSample(text, true);
        textCache[name] = text;
      }).then(function() {
        updateWordCount();
      }).done();
    }
  }

  function showHiddenLanguages() {
    var enableLang = {
      'ar': function() {
        $('label[for="text-ar"]').show();
        $('label[for="lang-ar"]').show();
      }
    };

    Object.keys($.url().param()).filter(function(p) {
      return p.slice(0, 5) === 'lang-';
    }).map(function(p) {
      return p.slice(5, p.length);
    }).forEach(function(lang) {
      if (enableLang[lang]) {
        enableLang[lang]();
      }
    });
  }

  function selfAnalysis() {
    return QUERY_PARAMS.source == 'myself';
  }

  function setSelfAnalysis() {
    globalState.twitterUserId = TWITTER_USER.handle;
    globalState.twitterUserImage = TWITTER_USER.image;
    loadTwitterUser(TWITTER_USER.handle, {live_crawling: true});
    $('#self-analysis-tab').trigger('click');
    $('#your-twitter-panel .auth-form').hide();
    $('#your-twitter-panel .analysis-form label').remove();
    $('#your-twitter-panel .analysis-form').append([
      '<label class="base--inline-label input--radio" for="my-twitter">', '<img class="input--thumb" src="', TWITTER_USER.image || '/images/no-image.png',
      '">@',
      TWITTER_USER.handle,
      '</label>'
    ].join(''));
    $('#my-twitter').trigger('click');
    $('#your-twitter-panel .analysis-form').show();
  }

  function setupTeamMember(member, url, payload, i){
        console.log(payload, url)
        return $.ajax({
          type: 'POST',
          data: payload,
          url: url,
          dataType: 'json',
          success: function(data) {
            console.log(member);
            member.profile = profile_summary(data);
            drawTeamMember(member);
          },
          error: function(err) {
            // eslint-disable-next-line
            console.error(err);
            $loading.hide();
            $error.show();
            $errorMessage.text(getErrorMessage(err));
          }
        });
  }
    
  function setupCandidate(candidate, url, payload, i){
      return $.ajax({
          type: 'POST',
          data: payload,
          url: url,
          dataType: 'json',
          success: function(data) {
            candidate.profile = profile_summary(data);
            drawCandidate(candidate);
            if (teamMembersLoaded){
                var match = summary_match(teamAverage, candidate.profile);
                var percentage = Math.floor(match.personality * 100);
                candidate.matchPercentColumn.text(percentage + "%");
            }
          },
          error: function(err) {
            // eslint-disable-next-line
            console.error(err);
            $loading.hide();
            $error.show();
            $errorMessage.text(getErrorMessage(err));
          }
    });
  }
    
  function initialize() {
    teamHead.selectAll("*").remove();
    setLoadingState();
      
    var calls = []
    for (var i = 0; i < team.length; i++){
        var payload = {
            source_type: 'twitter',
            userId: team[i].id,
            accept_language: team[i].lang,
            include_raw: false,
            consumption_preferences: true,
            language: undefined
        }
        
        var url = '/api/profile/twitter';
        
        calls.push(setupTeamMember(team[i], url, payload, i));
    }
      
    
    $.when.apply(null, calls).done(function(){
        teamAverage = averageProfileSummaries(team.map(x => x.profile));
        teamMembersLoaded = true;
        showPersonalityMatches();
    })
      
    for (var i = 0; i < candidates.length; i++){
        var payload = {
            source_type: 'twitter',
            userId: candidates[i].id,
            accept_language: candidates[i].lang,
            include_raw: false,
            consumption_preferences: true,
            language: undefined
        }

        var url = '/api/profile/twitter';
        
        candidates[i].profile = undefined;
        
        calls.push(setupCandidate(candidates[i], url, payload, i));
        
        
    }
      
    $.when.apply(null, calls).done(function(){
        $loading.hide();
    })
  }
    
  function showPersonalityMatches(){
      for (var i = 0; i < candidates.length; i++){
          if (candidates[i].profile !== undefined){
              var match = summary_match(teamAverage, candidates[i].profile);
              var percentage = Math.floor(match.personality * 100);
              candidates[i].matchPercentColumn.text(percentage + "%");
          }
      }
  }

  function drawTeamMember(member){
      member.elem = teamHead.append("label").attr({
          for: "apache-id",
          "aria-label": "apache spark",
          class: "bx--structured-list-row",
          tabindex: 0
      })

      member.dummyColumn = member.elem.append("div").attr("class", "bx--structured-list-td");
      member.imageElem = member.elem.append("div").attr("class", "bx--structured-list-td bx--structured-list-content--nowrap");
      member.image = member.imageElem.append("img").attr({
          class: "input--thumb",
          src: member.imagePath
      })

      member.text = member.elem.append("div").attr("class", "bx--structured-list-td")
      member.text.text("@" + member.id + " (" + member.lang.toUpperCase() + ")");
  }
    
  function drawCandidate(candidate){
      candidate.elem = candidateHead.append("label").attr({
          for: "apache-id",
          "aria-label": "apache spark",
          class: "bx--structured-list-row",
          tabindex: 0
      });
      
      candidate.matchPercentColumn = candidate.elem.append("div").attr("class", "bx--structured-list-td");
      candidate.imageElem = candidate.elem.append("div").attr("class", "bx--structured-list-td bx--structured-list-content--nowrap");
      candidate.image = candidate.imageElem.append("img").attr({
          class: "input--thumb",
          src: candidate.imagePath
      })

      candidate.text = candidate.elem.append("div").attr("class", "bx--structured-list-td")
      candidate.text.text("@" + candidate.id + " (" + candidate.lang.toUpperCase() + ")");
  }
    
  function selectDefaultLanguage() {
    if (['en', 'es', 'ja', 'ar', 'ko'].indexOf(globalState.userLocale) >= 0) {
      $('#lang-' + globalState.userLocale).prop('checked', true).trigger('click');
    }
  }

  function countWords(str) {
    return str.split(' ').length;
  }

  function updateWordCount() {
    $inputWordCount.text(countWords($inputTextArea.val()));
  }

  function updateJSON(results) {
    $outputJSONCode.html(JSON.stringify(results, null, 2));
    $('.code--json').each(function(i, b) {
      hljs.highlightBlock(b);
    });
  }

  initialize();
});
