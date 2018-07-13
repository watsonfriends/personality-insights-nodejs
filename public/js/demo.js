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
        imagePath: "/images/twitter/oprah.png",
        profile: {
          "word_count": 15128,
          "processed_language": "en",
          "personality": [
            {
              "trait_id": "big5_openness",
              "name": "Openness",
              "category": "personality",
              "percentile": 0.8048087217136444,
              "children": [
                {
                  "trait_id": "facet_adventurousness",
                  "name": "Adventurousness",
                  "category": "personality",
                  "percentile": 0.9045974768772609
                },
                {
                  "trait_id": "facet_artistic_interests",
                  "name": "Artistic interests",
                  "category": "personality",
                  "percentile": 0.9790201511572232
                },
                {
                  "trait_id": "facet_emotionality",
                  "name": "Emotionality",
                  "category": "personality",
                  "percentile": 0.994913153896493
                },
                {
                  "trait_id": "facet_imagination",
                  "name": "Imagination",
                  "category": "personality",
                  "percentile": 0.8714517724206957
                },
                {
                  "trait_id": "facet_intellect",
                  "name": "Intellect",
                  "category": "personality",
                  "percentile": 0.8835958016905736
                },
                {
                  "trait_id": "facet_liberalism",
                  "name": "Authority-challenging",
                  "category": "personality",
                  "percentile": 0.6486344859769552
                }
              ]
            },
            {
              "trait_id": "big5_conscientiousness",
              "name": "Conscientiousness",
              "category": "personality",
              "percentile": 0.8102947333861581,
              "children": [
                {
                  "trait_id": "facet_achievement_striving",
                  "name": "Achievement striving",
                  "category": "personality",
                  "percentile": 0.8447942535266852
                },
                {
                  "trait_id": "facet_cautiousness",
                  "name": "Cautiousness",
                  "category": "personality",
                  "percentile": 0.7225672485998348
                },
                {
                  "trait_id": "facet_dutifulness",
                  "name": "Dutifulness",
                  "category": "personality",
                  "percentile": 0.8414459590561425
                },
                {
                  "trait_id": "facet_orderliness",
                  "name": "Orderliness",
                  "category": "personality",
                  "percentile": 0.6154468578992103
                },
                {
                  "trait_id": "facet_self_discipline",
                  "name": "Self-discipline",
                  "category": "personality",
                  "percentile": 0.8344273426362091
                },
                {
                  "trait_id": "facet_self_efficacy",
                  "name": "Self-efficacy",
                  "category": "personality",
                  "percentile": 0.7041262378443771
                }
              ]
            },
            {
              "trait_id": "big5_extraversion",
              "name": "Extraversion",
              "category": "personality",
              "percentile": 0.6425580321109656,
              "children": [
                {
                  "trait_id": "facet_activity_level",
                  "name": "Activity level",
                  "category": "personality",
                  "percentile": 0.8860397181738027
                },
                {
                  "trait_id": "facet_assertiveness",
                  "name": "Assertiveness",
                  "category": "personality",
                  "percentile": 0.6742837190539857
                },
                {
                  "trait_id": "facet_cheerfulness",
                  "name": "Cheerfulness",
                  "category": "personality",
                  "percentile": 0.9430030813836863
                },
                {
                  "trait_id": "facet_excitement_seeking",
                  "name": "Excitement-seeking",
                  "category": "personality",
                  "percentile": 0.5936685312560733
                },
                {
                  "trait_id": "facet_friendliness",
                  "name": "Outgoing",
                  "category": "personality",
                  "percentile": 0.9603396711358603
                },
                {
                  "trait_id": "facet_gregariousness",
                  "name": "Gregariousness",
                  "category": "personality",
                  "percentile": 0.6570127643040263
                }
              ]
            },
            {
              "trait_id": "big5_agreeableness",
              "name": "Agreeableness",
              "category": "personality",
              "percentile": 0.9441476521819426,
              "children": [
                {
                  "trait_id": "facet_altruism",
                  "name": "Altruism",
                  "category": "personality",
                  "percentile": 0.9925983032671803
                },
                {
                  "trait_id": "facet_cooperation",
                  "name": "Cooperation",
                  "category": "personality",
                  "percentile": 0.8640865926209997
                },
                {
                  "trait_id": "facet_modesty",
                  "name": "Modesty",
                  "category": "personality",
                  "percentile": 0.7777409427743319
                },
                {
                  "trait_id": "facet_morality",
                  "name": "Uncompromising",
                  "category": "personality",
                  "percentile": 0.8952857419791442
                },
                {
                  "trait_id": "facet_sympathy",
                  "name": "Sympathy",
                  "category": "personality",
                  "percentile": 0.994659354665798
                },
                {
                  "trait_id": "facet_trust",
                  "name": "Trust",
                  "category": "personality",
                  "percentile": 0.9031062247867112
                }
              ]
            },
            {
              "trait_id": "big5_neuroticism",
              "name": "Emotional range",
              "category": "personality",
              "percentile": 0.5011424258038871,
              "children": [
                {
                  "trait_id": "facet_anger",
                  "name": "Fiery",
                  "category": "personality",
                  "percentile": 0.16919226490209138
                },
                {
                  "trait_id": "facet_anxiety",
                  "name": "Prone to worry",
                  "category": "personality",
                  "percentile": 0.42130232455149075
                },
                {
                  "trait_id": "facet_depression",
                  "name": "Melancholy",
                  "category": "personality",
                  "percentile": 0.1490766395109473
                },
                {
                  "trait_id": "facet_immoderation",
                  "name": "Immoderation",
                  "category": "personality",
                  "percentile": 0.2702704377158157
                },
                {
                  "trait_id": "facet_self_consciousness",
                  "name": "Self-consciousness",
                  "category": "personality",
                  "percentile": 0.29325681738170095
                },
                {
                  "trait_id": "facet_vulnerability",
                  "name": "Susceptible to stress",
                  "category": "personality",
                  "percentile": 0.3862483573834635
                }
              ]
            }
          ],
          "needs": [
            {
              "trait_id": "need_challenge",
              "name": "Challenge",
              "category": "needs",
              "percentile": 0.6699981453953766
            },
            {
              "trait_id": "need_closeness",
              "name": "Closeness",
              "category": "needs",
              "percentile": 0.8366389466400257
            },
            {
              "trait_id": "need_curiosity",
              "name": "Curiosity",
              "category": "needs",
              "percentile": 0.9338147737801363
            },
            {
              "trait_id": "need_excitement",
              "name": "Excitement",
              "category": "needs",
              "percentile": 0.7368905165835753
            },
            {
              "trait_id": "need_harmony",
              "name": "Harmony",
              "category": "needs",
              "percentile": 0.9681096581919244
            },
            {
              "trait_id": "need_ideal",
              "name": "Ideal",
              "category": "needs",
              "percentile": 0.6846651401448991
            },
            {
              "trait_id": "need_liberty",
              "name": "Liberty",
              "category": "needs",
              "percentile": 0.7944143551559293
            },
            {
              "trait_id": "need_love",
              "name": "Love",
              "category": "needs",
              "percentile": 0.8187640742747349
            },
            {
              "trait_id": "need_practicality",
              "name": "Practicality",
              "category": "needs",
              "percentile": 0.34469863540722323
            },
            {
              "trait_id": "need_self_expression",
              "name": "Self-expression",
              "category": "needs",
              "percentile": 0.8698181973941164
            },
            {
              "trait_id": "need_stability",
              "name": "Stability",
              "category": "needs",
              "percentile": 0.8705205013979334
            },
            {
              "trait_id": "need_structure",
              "name": "Structure",
              "category": "needs",
              "percentile": 0.7464328575415977
            }
          ],
          "values": [
            {
              "trait_id": "value_conservation",
              "name": "Conservation",
              "category": "values",
              "percentile": 0.886672268738759
            },
            {
              "trait_id": "value_openness_to_change",
              "name": "Openness to change",
              "category": "values",
              "percentile": 0.8696769334020679
            },
            {
              "trait_id": "value_hedonism",
              "name": "Hedonism",
              "category": "values",
              "percentile": 0.4401896345423549
            },
            {
              "trait_id": "value_self_enhancement",
              "name": "Self-enhancement",
              "category": "values",
              "percentile": 0.6488575994223418
            },
            {
              "trait_id": "value_self_transcendence",
              "name": "Self-transcendence",
              "category": "values",
              "percentile": 0.8280778884301451
            }
          ],
          "behavior": [
            {
              "trait_id": "behavior_sunday",
              "name": "Sunday",
              "category": "behavior",
              "percentage": 0.2217782217782218
            },
            {
              "trait_id": "behavior_monday",
              "name": "Monday",
              "category": "behavior",
              "percentage": 0.42157842157842157
            },
            {
              "trait_id": "behavior_tuesday",
              "name": "Tuesday",
              "category": "behavior",
              "percentage": 0.07092907092907093
            },
            {
              "trait_id": "behavior_wednesday",
              "name": "Wednesday",
              "category": "behavior",
              "percentage": 0.01098901098901099
            },
            {
              "trait_id": "behavior_thursday",
              "name": "Thursday",
              "category": "behavior",
              "percentage": 0.12087912087912088
            },
            {
              "trait_id": "behavior_friday",
              "name": "Friday",
              "category": "behavior",
              "percentage": 0.07692307692307693
            },
            {
              "trait_id": "behavior_saturday",
              "name": "Saturday",
              "category": "behavior",
              "percentage": 0.07692307692307693
            },
            {
              "trait_id": "behavior_0000",
              "name": "0:00 am",
              "category": "behavior",
              "percentage": 0.4515484515484515
            },
            {
              "trait_id": "behavior_0100",
              "name": "1:00 am",
              "category": "behavior",
              "percentage": 0.12087912087912088
            },
            {
              "trait_id": "behavior_0200",
              "name": "2:00 am",
              "category": "behavior",
              "percentage": 0.02097902097902098
            },
            {
              "trait_id": "behavior_0300",
              "name": "3:00 am",
              "category": "behavior",
              "percentage": 0.0939060939060939
            },
            {
              "trait_id": "behavior_0400",
              "name": "4:00 am",
              "category": "behavior",
              "percentage": 0.01998001998001998
            },
            {
              "trait_id": "behavior_0500",
              "name": "5:00 am",
              "category": "behavior",
              "percentage": 0
            },
            {
              "trait_id": "behavior_0600",
              "name": "6:00 am",
              "category": "behavior",
              "percentage": 0
            },
            {
              "trait_id": "behavior_0700",
              "name": "7:00 am",
              "category": "behavior",
              "percentage": 0.01098901098901099
            },
            {
              "trait_id": "behavior_0800",
              "name": "8:00 am",
              "category": "behavior",
              "percentage": 0
            },
            {
              "trait_id": "behavior_0900",
              "name": "9:00 am",
              "category": "behavior",
              "percentage": 0
            },
            {
              "trait_id": "behavior_1000",
              "name": "10:00 am",
              "category": "behavior",
              "percentage": 0
            },
            {
              "trait_id": "behavior_1100",
              "name": "11:00 am",
              "category": "behavior",
              "percentage": 0
            },
            {
              "trait_id": "behavior_1200",
              "name": "12:00 pm",
              "category": "behavior",
              "percentage": 0
            },
            {
              "trait_id": "behavior_1300",
              "name": "1:00 pm",
              "category": "behavior",
              "percentage": 0
            },
            {
              "trait_id": "behavior_1400",
              "name": "2:00 pm",
              "category": "behavior",
              "percentage": 0
            },
            {
              "trait_id": "behavior_1500",
              "name": "3:00 pm",
              "category": "behavior",
              "percentage": 0.02197802197802198
            },
            {
              "trait_id": "behavior_1600",
              "name": "4:00 pm",
              "category": "behavior",
              "percentage": 0.02197802197802198
            },
            {
              "trait_id": "behavior_1700",
              "name": "5:00 pm",
              "category": "behavior",
              "percentage": 0.03196803196803197
            },
            {
              "trait_id": "behavior_1800",
              "name": "6:00 pm",
              "category": "behavior",
              "percentage": 0.00999000999000999
            },
            {
              "trait_id": "behavior_1900",
              "name": "7:00 pm",
              "category": "behavior",
              "percentage": 0.01098901098901099
            },
            {
              "trait_id": "behavior_2000",
              "name": "8:00 pm",
              "category": "behavior",
              "percentage": 0.02197802197802198
            },
            {
              "trait_id": "behavior_2100",
              "name": "9:00 pm",
              "category": "behavior",
              "percentage": 0
            },
            {
              "trait_id": "behavior_2200",
              "name": "10:00 pm",
              "category": "behavior",
              "percentage": 0.04095904095904096
            },
            {
              "trait_id": "behavior_2300",
              "name": "11:00 pm",
              "category": "behavior",
              "percentage": 0.12187812187812187
            }
          ],
          "consumption_preferences": [
            {
              "consumption_preference_category_id": "consumption_preferences_shopping",
              "name": "Purchasing Preferences",
              "consumption_preferences": [
                {
                  "consumption_preference_id": "consumption_preferences_automobile_ownership_cost",
                  "name": "Likely to be sensitive to ownership cost when buying automobiles",
                  "score": 0
                },
                {
                  "consumption_preference_id": "consumption_preferences_automobile_safety",
                  "name": "Likely to prefer safety when buying automobiles",
                  "score": 0.5
                },
                {
                  "consumption_preference_id": "consumption_preferences_clothes_quality",
                  "name": "Likely to prefer quality when buying clothes",
                  "score": 0
                },
                {
                  "consumption_preference_id": "consumption_preferences_clothes_style",
                  "name": "Likely to prefer style when buying clothes",
                  "score": 1
                },
                {
                  "consumption_preference_id": "consumption_preferences_clothes_comfort",
                  "name": "Likely to prefer comfort when buying clothes",
                  "score": 0
                },
                {
                  "consumption_preference_id": "consumption_preferences_influence_brand_name",
                  "name": "Likely to be influenced by brand name when making product purchases",
                  "score": 0.5
                },
                {
                  "consumption_preference_id": "consumption_preferences_influence_utility",
                  "name": "Likely to be influenced by product utility when making product purchases",
                  "score": 0.5
                },
                {
                  "consumption_preference_id": "consumption_preferences_influence_online_ads",
                  "name": "Likely to be influenced by online ads when making product purchases",
                  "score": 1
                },
                {
                  "consumption_preference_id": "consumption_preferences_influence_social_media",
                  "name": "Likely to be influenced by social media when making product purchases",
                  "score": 1
                },
                {
                  "consumption_preference_id": "consumption_preferences_influence_family_members",
                  "name": "Likely to be influenced by family when making product purchases",
                  "score": 1
                },
                {
                  "consumption_preference_id": "consumption_preferences_spur_of_moment",
                  "name": "Likely to indulge in spur of the moment purchases",
                  "score": 0.5
                },
                {
                  "consumption_preference_id": "consumption_preferences_credit_card_payment",
                  "name": "Likely to prefer using credit cards for shopping",
                  "score": 0
                }
              ]
            },
            {
              "consumption_preference_category_id": "consumption_preferences_health_and_activity",
              "name": "Health & Activity Preferences",
              "consumption_preferences": [
                {
                  "consumption_preference_id": "consumption_preferences_eat_out",
                  "name": "Likely to eat out frequently",
                  "score": 1
                },
                {
                  "consumption_preference_id": "consumption_preferences_gym_membership",
                  "name": "Likely to have a gym membership",
                  "score": 1
                },
                {
                  "consumption_preference_id": "consumption_preferences_outdoor",
                  "name": "Likely to like outdoor activities",
                  "score": 0
                }
              ]
            },
            {
              "consumption_preference_category_id": "consumption_preferences_environmental_concern",
              "name": "Environmental Concern Preferences",
              "consumption_preferences": [
                {
                  "consumption_preference_id": "consumption_preferences_concerned_environment",
                  "name": "Likely to be concerned about the environment",
                  "score": 0
                }
              ]
            },
            {
              "consumption_preference_category_id": "consumption_preferences_entrepreneurship",
              "name": "Entrepreneurship Preferences",
              "consumption_preferences": [
                {
                  "consumption_preference_id": "consumption_preferences_start_business",
                  "name": "Likely to consider starting a business in next few years",
                  "score": 1
                }
              ]
            },
            {
              "consumption_preference_category_id": "consumption_preferences_movie",
              "name": "Movie Preferences",
              "consumption_preferences": [
                {
                  "consumption_preference_id": "consumption_preferences_movie_romance",
                  "name": "Likely to like romance movies",
                  "score": 1
                },
                {
                  "consumption_preference_id": "consumption_preferences_movie_adventure",
                  "name": "Likely to like adventure movies",
                  "score": 0
                },
                {
                  "consumption_preference_id": "consumption_preferences_movie_horror",
                  "name": "Likely to like horror movies",
                  "score": 1
                },
                {
                  "consumption_preference_id": "consumption_preferences_movie_musical",
                  "name": "Likely to like musical movies",
                  "score": 0
                },
                {
                  "consumption_preference_id": "consumption_preferences_movie_historical",
                  "name": "Likely to like historical movies",
                  "score": 0
                },
                {
                  "consumption_preference_id": "consumption_preferences_movie_science_fiction",
                  "name": "Likely to like science-fiction movies",
                  "score": 0
                },
                {
                  "consumption_preference_id": "consumption_preferences_movie_war",
                  "name": "Likely to like war movies",
                  "score": 0
                },
                {
                  "consumption_preference_id": "consumption_preferences_movie_drama",
                  "name": "Likely to like drama movies",
                  "score": 1
                },
                {
                  "consumption_preference_id": "consumption_preferences_movie_action",
                  "name": "Likely to like action movies",
                  "score": 0
                },
                {
                  "consumption_preference_id": "consumption_preferences_movie_documentary",
                  "name": "Likely to like documentary movies",
                  "score": 0
                }
              ]
            },
            {
              "consumption_preference_category_id": "consumption_preferences_music",
              "name": "Music Preferences",
              "consumption_preferences": [
                {
                  "consumption_preference_id": "consumption_preferences_music_rap",
                  "name": "Likely to like rap music",
                  "score": 1
                },
                {
                  "consumption_preference_id": "consumption_preferences_music_country",
                  "name": "Likely to like country music",
                  "score": 1
                },
                {
                  "consumption_preference_id": "consumption_preferences_music_r_b",
                  "name": "Likely to like R&B music",
                  "score": 1
                },
                {
                  "consumption_preference_id": "consumption_preferences_music_hip_hop",
                  "name": "Likely to like hip hop music",
                  "score": 1
                },
                {
                  "consumption_preference_id": "consumption_preferences_music_live_event",
                  "name": "Likely to attend live musical events",
                  "score": 0
                },
                {
                  "consumption_preference_id": "consumption_preferences_music_playing",
                  "name": "Likely to have experience playing music",
                  "score": 0
                },
                {
                  "consumption_preference_id": "consumption_preferences_music_latin",
                  "name": "Likely to like Latin music",
                  "score": 1
                },
                {
                  "consumption_preference_id": "consumption_preferences_music_rock",
                  "name": "Likely to like rock music",
                  "score": 0
                },
                {
                  "consumption_preference_id": "consumption_preferences_music_classical",
                  "name": "Likely to like classical music",
                  "score": 0
                }
              ]
            },
            {
              "consumption_preference_category_id": "consumption_preferences_reading",
              "name": "Reading Preferences",
              "consumption_preferences": [
                {
                  "consumption_preference_id": "consumption_preferences_read_frequency",
                  "name": "Likely to read often",
                  "score": 0
                },
                {
                  "consumption_preference_id": "consumption_preferences_books_entertainment_magazines",
                  "name": "Likely to read entertainment magazines",
                  "score": 1
                },
                {
                  "consumption_preference_id": "consumption_preferences_books_non_fiction",
                  "name": "Likely to read non-fiction books",
                  "score": 0
                },
                {
                  "consumption_preference_id": "consumption_preferences_books_financial_investing",
                  "name": "Likely to read financial investment books",
                  "score": 1
                },
                {
                  "consumption_preference_id": "consumption_preferences_books_autobiographies",
                  "name": "Likely to read autobiographical books",
                  "score": 0
                }
              ]
            },
            {
              "consumption_preference_category_id": "consumption_preferences_volunteering",
              "name": "Volunteering Preferences",
              "consumption_preferences": [
                {
                  "consumption_preference_id": "consumption_preferences_volunteer",
                  "name": "Likely to volunteer for social causes",
                  "score": 0
                }
              ]
            }
          ],
          "warnings": []
        }
    },
    {
        id: "KingJames",
        lang: "en",
        imagePath: "/images/twitter/kingjames.jpg",
        profile: {
          "word_count": 13906,
          "processed_language": "en",
          "personality": [
            {
              "trait_id": "big5_openness",
              "name": "Openness",
              "category": "personality",
              "percentile": 0.37719285142427744,
              "children": [
                {
                  "trait_id": "facet_adventurousness",
                  "name": "Adventurousness",
                  "category": "personality",
                  "percentile": 0.6269902936062156
                },
                {
                  "trait_id": "facet_artistic_interests",
                  "name": "Artistic interests",
                  "category": "personality",
                  "percentile": 0.36502449340082244
                },
                {
                  "trait_id": "facet_emotionality",
                  "name": "Emotionality",
                  "category": "personality",
                  "percentile": 0.575277122861643
                },
                {
                  "trait_id": "facet_imagination",
                  "name": "Imagination",
                  "category": "personality",
                  "percentile": 0.6481685797103642
                },
                {
                  "trait_id": "facet_intellect",
                  "name": "Intellect",
                  "category": "personality",
                  "percentile": 0.26645540995219036
                },
                {
                  "trait_id": "facet_liberalism",
                  "name": "Authority-challenging",
                  "category": "personality",
                  "percentile": 0.41616860883248574
                }
              ]
            },
            {
              "trait_id": "big5_conscientiousness",
              "name": "Conscientiousness",
              "category": "personality",
              "percentile": 0.757494596417116,
              "children": [
                {
                  "trait_id": "facet_achievement_striving",
                  "name": "Achievement striving",
                  "category": "personality",
                  "percentile": 0.626132731305318
                },
                {
                  "trait_id": "facet_cautiousness",
                  "name": "Cautiousness",
                  "category": "personality",
                  "percentile": 0.6480554261936662
                },
                {
                  "trait_id": "facet_dutifulness",
                  "name": "Dutifulness",
                  "category": "personality",
                  "percentile": 0.40733337460093694
                },
                {
                  "trait_id": "facet_orderliness",
                  "name": "Orderliness",
                  "category": "personality",
                  "percentile": 0.7503536559594107
                },
                {
                  "trait_id": "facet_self_discipline",
                  "name": "Self-discipline",
                  "category": "personality",
                  "percentile": 0.7469491071859633
                },
                {
                  "trait_id": "facet_self_efficacy",
                  "name": "Self-efficacy",
                  "category": "personality",
                  "percentile": 0.5294511637795724
                }
              ]
            },
            {
              "trait_id": "big5_extraversion",
              "name": "Extraversion",
              "category": "personality",
              "percentile": 0.7050144929885472,
              "children": [
                {
                  "trait_id": "facet_activity_level",
                  "name": "Activity level",
                  "category": "personality",
                  "percentile": 0.5873567314350562
                },
                {
                  "trait_id": "facet_assertiveness",
                  "name": "Assertiveness",
                  "category": "personality",
                  "percentile": 0.6318532123843208
                },
                {
                  "trait_id": "facet_cheerfulness",
                  "name": "Cheerfulness",
                  "category": "personality",
                  "percentile": 0.8605364160670006
                },
                {
                  "trait_id": "facet_excitement_seeking",
                  "name": "Excitement-seeking",
                  "category": "personality",
                  "percentile": 0.5690047072868112
                },
                {
                  "trait_id": "facet_friendliness",
                  "name": "Outgoing",
                  "category": "personality",
                  "percentile": 0.8022556395101721
                },
                {
                  "trait_id": "facet_gregariousness",
                  "name": "Gregariousness",
                  "category": "personality",
                  "percentile": 0.765372217791855
                }
              ]
            },
            {
              "trait_id": "big5_agreeableness",
              "name": "Agreeableness",
              "category": "personality",
              "percentile": 0.8580034481075867,
              "children": [
                {
                  "trait_id": "facet_altruism",
                  "name": "Altruism",
                  "category": "personality",
                  "percentile": 0.3647630892068823
                },
                {
                  "trait_id": "facet_cooperation",
                  "name": "Cooperation",
                  "category": "personality",
                  "percentile": 0.4446601259999595
                },
                {
                  "trait_id": "facet_modesty",
                  "name": "Modesty",
                  "category": "personality",
                  "percentile": 0.41380634043568587
                },
                {
                  "trait_id": "facet_morality",
                  "name": "Uncompromising",
                  "category": "personality",
                  "percentile": 0.4704690931519337
                },
                {
                  "trait_id": "facet_sympathy",
                  "name": "Sympathy",
                  "category": "personality",
                  "percentile": 0.3895370798038277
                },
                {
                  "trait_id": "facet_trust",
                  "name": "Trust",
                  "category": "personality",
                  "percentile": 0.6442270337822056
                }
              ]
            },
            {
              "trait_id": "big5_neuroticism",
              "name": "Emotional range",
              "category": "personality",
              "percentile": 0.6918024797191394,
              "children": [
                {
                  "trait_id": "facet_anger",
                  "name": "Fiery",
                  "category": "personality",
                  "percentile": 0.40368496466866327
                },
                {
                  "trait_id": "facet_anxiety",
                  "name": "Prone to worry",
                  "category": "personality",
                  "percentile": 0.33132834291295116
                },
                {
                  "trait_id": "facet_depression",
                  "name": "Melancholy",
                  "category": "personality",
                  "percentile": 0.19722793550998585
                },
                {
                  "trait_id": "facet_immoderation",
                  "name": "Immoderation",
                  "category": "personality",
                  "percentile": 0.34686729097194513
                },
                {
                  "trait_id": "facet_self_consciousness",
                  "name": "Self-consciousness",
                  "category": "personality",
                  "percentile": 0.388608268481245
                },
                {
                  "trait_id": "facet_vulnerability",
                  "name": "Susceptible to stress",
                  "category": "personality",
                  "percentile": 0.2982247942178574
                }
              ]
            }
          ],
          "needs": [
            {
              "trait_id": "need_challenge",
              "name": "Challenge",
              "category": "needs",
              "percentile": 0.9827953401602001
            },
            {
              "trait_id": "need_closeness",
              "name": "Closeness",
              "category": "needs",
              "percentile": 0.72264321320099
            },
            {
              "trait_id": "need_curiosity",
              "name": "Curiosity",
              "category": "needs",
              "percentile": 0.7425116633091317
            },
            {
              "trait_id": "need_excitement",
              "name": "Excitement",
              "category": "needs",
              "percentile": 0.8684057043557365
            },
            {
              "trait_id": "need_harmony",
              "name": "Harmony",
              "category": "needs",
              "percentile": 0.8143365951087438
            },
            {
              "trait_id": "need_ideal",
              "name": "Ideal",
              "category": "needs",
              "percentile": 0.933159502875314
            },
            {
              "trait_id": "need_liberty",
              "name": "Liberty",
              "category": "needs",
              "percentile": 0.847293368969775
            },
            {
              "trait_id": "need_love",
              "name": "Love",
              "category": "needs",
              "percentile": 0.7834845877475028
            },
            {
              "trait_id": "need_practicality",
              "name": "Practicality",
              "category": "needs",
              "percentile": 0.8116892883252307
            },
            {
              "trait_id": "need_self_expression",
              "name": "Self-expression",
              "category": "needs",
              "percentile": 0.7267389138586307
            },
            {
              "trait_id": "need_stability",
              "name": "Stability",
              "category": "needs",
              "percentile": 0.9749889630209259
            },
            {
              "trait_id": "need_structure",
              "name": "Structure",
              "category": "needs",
              "percentile": 0.9293164686930341
            }
          ],
          "values": [
            {
              "trait_id": "value_conservation",
              "name": "Conservation",
              "category": "values",
              "percentile": 0.9516083704167001
            },
            {
              "trait_id": "value_openness_to_change",
              "name": "Openness to change",
              "category": "values",
              "percentile": 0.807672580636824
            },
            {
              "trait_id": "value_hedonism",
              "name": "Hedonism",
              "category": "values",
              "percentile": 0.8529759970344186
            },
            {
              "trait_id": "value_self_enhancement",
              "name": "Self-enhancement",
              "category": "values",
              "percentile": 0.9424726774444241
            },
            {
              "trait_id": "value_self_transcendence",
              "name": "Self-transcendence",
              "category": "values",
              "percentile": 0.6350518411502489
            }
          ],
          "behavior": [
            {
              "trait_id": "behavior_sunday",
              "name": "Sunday",
              "category": "behavior",
              "percentage": 0.1028971028971029
            },
            {
              "trait_id": "behavior_monday",
              "name": "Monday",
              "category": "behavior",
              "percentage": 0.0919080919080919
            },
            {
              "trait_id": "behavior_tuesday",
              "name": "Tuesday",
              "category": "behavior",
              "percentage": 0.19080919080919082
            },
            {
              "trait_id": "behavior_wednesday",
              "name": "Wednesday",
              "category": "behavior",
              "percentage": 0.13186813186813187
            },
            {
              "trait_id": "behavior_thursday",
              "name": "Thursday",
              "category": "behavior",
              "percentage": 0.19080919080919082
            },
            {
              "trait_id": "behavior_friday",
              "name": "Friday",
              "category": "behavior",
              "percentage": 0.12887112887112886
            },
            {
              "trait_id": "behavior_saturday",
              "name": "Saturday",
              "category": "behavior",
              "percentage": 0.16283716283716285
            },
            {
              "trait_id": "behavior_0000",
              "name": "0:00 am",
              "category": "behavior",
              "percentage": 0.11188811188811189
            },
            {
              "trait_id": "behavior_0100",
              "name": "1:00 am",
              "category": "behavior",
              "percentage": 0.08191808191808192
            },
            {
              "trait_id": "behavior_0200",
              "name": "2:00 am",
              "category": "behavior",
              "percentage": 0.0979020979020979
            },
            {
              "trait_id": "behavior_0300",
              "name": "3:00 am",
              "category": "behavior",
              "percentage": 0.03296703296703297
            },
            {
              "trait_id": "behavior_0400",
              "name": "4:00 am",
              "category": "behavior",
              "percentage": 0.012987012987012988
            },
            {
              "trait_id": "behavior_0500",
              "name": "5:00 am",
              "category": "behavior",
              "percentage": 0.005994005994005994
            },
            {
              "trait_id": "behavior_0600",
              "name": "6:00 am",
              "category": "behavior",
              "percentage": 0.030969030969030968
            },
            {
              "trait_id": "behavior_0700",
              "name": "7:00 am",
              "category": "behavior",
              "percentage": 0
            },
            {
              "trait_id": "behavior_0800",
              "name": "8:00 am",
              "category": "behavior",
              "percentage": 0
            },
            {
              "trait_id": "behavior_0900",
              "name": "9:00 am",
              "category": "behavior",
              "percentage": 0
            },
            {
              "trait_id": "behavior_1000",
              "name": "10:00 am",
              "category": "behavior",
              "percentage": 0.013986013986013986
            },
            {
              "trait_id": "behavior_1100",
              "name": "11:00 am",
              "category": "behavior",
              "percentage": 0.006993006993006993
            },
            {
              "trait_id": "behavior_1200",
              "name": "12:00 pm",
              "category": "behavior",
              "percentage": 0.005994005994005994
            },
            {
              "trait_id": "behavior_1300",
              "name": "1:00 pm",
              "category": "behavior",
              "percentage": 0.03596403596403597
            },
            {
              "trait_id": "behavior_1400",
              "name": "2:00 pm",
              "category": "behavior",
              "percentage": 0.006993006993006993
            },
            {
              "trait_id": "behavior_1500",
              "name": "3:00 pm",
              "category": "behavior",
              "percentage": 0.026973026973026972
            },
            {
              "trait_id": "behavior_1600",
              "name": "4:00 pm",
              "category": "behavior",
              "percentage": 0.025974025974025976
            },
            {
              "trait_id": "behavior_1700",
              "name": "5:00 pm",
              "category": "behavior",
              "percentage": 0.10589410589410589
            },
            {
              "trait_id": "behavior_1800",
              "name": "6:00 pm",
              "category": "behavior",
              "percentage": 0.055944055944055944
            },
            {
              "trait_id": "behavior_1900",
              "name": "7:00 pm",
              "category": "behavior",
              "percentage": 0.03296703296703297
            },
            {
              "trait_id": "behavior_2000",
              "name": "8:00 pm",
              "category": "behavior",
              "percentage": 0.054945054945054944
            },
            {
              "trait_id": "behavior_2100",
              "name": "9:00 pm",
              "category": "behavior",
              "percentage": 0.1048951048951049
            },
            {
              "trait_id": "behavior_2200",
              "name": "10:00 pm",
              "category": "behavior",
              "percentage": 0.08491508491508491
            },
            {
              "trait_id": "behavior_2300",
              "name": "11:00 pm",
              "category": "behavior",
              "percentage": 0.06293706293706294
            }
          ],
          "consumption_preferences": [
            {
              "consumption_preference_category_id": "consumption_preferences_shopping",
              "name": "Purchasing Preferences",
              "consumption_preferences": [
                {
                  "consumption_preference_id": "consumption_preferences_automobile_ownership_cost",
                  "name": "Likely to be sensitive to ownership cost when buying automobiles",
                  "score": 0
                },
                {
                  "consumption_preference_id": "consumption_preferences_automobile_safety",
                  "name": "Likely to prefer safety when buying automobiles",
                  "score": 0.5
                },
                {
                  "consumption_preference_id": "consumption_preferences_clothes_quality",
                  "name": "Likely to prefer quality when buying clothes",
                  "score": 0
                },
                {
                  "consumption_preference_id": "consumption_preferences_clothes_style",
                  "name": "Likely to prefer style when buying clothes",
                  "score": 1
                },
                {
                  "consumption_preference_id": "consumption_preferences_clothes_comfort",
                  "name": "Likely to prefer comfort when buying clothes",
                  "score": 0
                },
                {
                  "consumption_preference_id": "consumption_preferences_influence_brand_name",
                  "name": "Likely to be influenced by brand name when making product purchases",
                  "score": 1
                },
                {
                  "consumption_preference_id": "consumption_preferences_influence_utility",
                  "name": "Likely to be influenced by product utility when making product purchases",
                  "score": 0.5
                },
                {
                  "consumption_preference_id": "consumption_preferences_influence_online_ads",
                  "name": "Likely to be influenced by online ads when making product purchases",
                  "score": 1
                },
                {
                  "consumption_preference_id": "consumption_preferences_influence_social_media",
                  "name": "Likely to be influenced by social media when making product purchases",
                  "score": 1
                },
                {
                  "consumption_preference_id": "consumption_preferences_influence_family_members",
                  "name": "Likely to be influenced by family when making product purchases",
                  "score": 0
                },
                {
                  "consumption_preference_id": "consumption_preferences_spur_of_moment",
                  "name": "Likely to indulge in spur of the moment purchases",
                  "score": 0.5
                },
                {
                  "consumption_preference_id": "consumption_preferences_credit_card_payment",
                  "name": "Likely to prefer using credit cards for shopping",
                  "score": 0
                }
              ]
            },
            {
              "consumption_preference_category_id": "consumption_preferences_health_and_activity",
              "name": "Health & Activity Preferences",
              "consumption_preferences": [
                {
                  "consumption_preference_id": "consumption_preferences_eat_out",
                  "name": "Likely to eat out frequently",
                  "score": 1
                },
                {
                  "consumption_preference_id": "consumption_preferences_gym_membership",
                  "name": "Likely to have a gym membership",
                  "score": 1
                },
                {
                  "consumption_preference_id": "consumption_preferences_outdoor",
                  "name": "Likely to like outdoor activities",
                  "score": 1
                }
              ]
            },
            {
              "consumption_preference_category_id": "consumption_preferences_environmental_concern",
              "name": "Environmental Concern Preferences",
              "consumption_preferences": [
                {
                  "consumption_preference_id": "consumption_preferences_concerned_environment",
                  "name": "Likely to be concerned about the environment",
                  "score": 0
                }
              ]
            },
            {
              "consumption_preference_category_id": "consumption_preferences_entrepreneurship",
              "name": "Entrepreneurship Preferences",
              "consumption_preferences": [
                {
                  "consumption_preference_id": "consumption_preferences_start_business",
                  "name": "Likely to consider starting a business in next few years",
                  "score": 1
                }
              ]
            },
            {
              "consumption_preference_category_id": "consumption_preferences_movie",
              "name": "Movie Preferences",
              "consumption_preferences": [
                {
                  "consumption_preference_id": "consumption_preferences_movie_romance",
                  "name": "Likely to like romance movies",
                  "score": 1
                },
                {
                  "consumption_preference_id": "consumption_preferences_movie_adventure",
                  "name": "Likely to like adventure movies",
                  "score": 0
                },
                {
                  "consumption_preference_id": "consumption_preferences_movie_horror",
                  "name": "Likely to like horror movies",
                  "score": 1
                },
                {
                  "consumption_preference_id": "consumption_preferences_movie_musical",
                  "name": "Likely to like musical movies",
                  "score": 0
                },
                {
                  "consumption_preference_id": "consumption_preferences_movie_historical",
                  "name": "Likely to like historical movies",
                  "score": 0
                },
                {
                  "consumption_preference_id": "consumption_preferences_movie_science_fiction",
                  "name": "Likely to like science-fiction movies",
                  "score": 0
                },
                {
                  "consumption_preference_id": "consumption_preferences_movie_war",
                  "name": "Likely to like war movies",
                  "score": 1
                },
                {
                  "consumption_preference_id": "consumption_preferences_movie_drama",
                  "name": "Likely to like drama movies",
                  "score": 0
                },
                {
                  "consumption_preference_id": "consumption_preferences_movie_action",
                  "name": "Likely to like action movies",
                  "score": 0
                },
                {
                  "consumption_preference_id": "consumption_preferences_movie_documentary",
                  "name": "Likely to like documentary movies",
                  "score": 0
                }
              ]
            },
            {
              "consumption_preference_category_id": "consumption_preferences_music",
              "name": "Music Preferences",
              "consumption_preferences": [
                {
                  "consumption_preference_id": "consumption_preferences_music_rap",
                  "name": "Likely to like rap music",
                  "score": 1
                },
                {
                  "consumption_preference_id": "consumption_preferences_music_country",
                  "name": "Likely to like country music",
                  "score": 1
                },
                {
                  "consumption_preference_id": "consumption_preferences_music_r_b",
                  "name": "Likely to like R&B music",
                  "score": 1
                },
                {
                  "consumption_preference_id": "consumption_preferences_music_hip_hop",
                  "name": "Likely to like hip hop music",
                  "score": 1
                },
                {
                  "consumption_preference_id": "consumption_preferences_music_live_event",
                  "name": "Likely to attend live musical events",
                  "score": 0
                },
                {
                  "consumption_preference_id": "consumption_preferences_music_playing",
                  "name": "Likely to have experience playing music",
                  "score": 0
                },
                {
                  "consumption_preference_id": "consumption_preferences_music_latin",
                  "name": "Likely to like Latin music",
                  "score": 0
                },
                {
                  "consumption_preference_id": "consumption_preferences_music_rock",
                  "name": "Likely to like rock music",
                  "score": 0
                },
                {
                  "consumption_preference_id": "consumption_preferences_music_classical",
                  "name": "Likely to like classical music",
                  "score": 0
                }
              ]
            },
            {
              "consumption_preference_category_id": "consumption_preferences_reading",
              "name": "Reading Preferences",
              "consumption_preferences": [
                {
                  "consumption_preference_id": "consumption_preferences_read_frequency",
                  "name": "Likely to read often",
                  "score": 0
                },
                {
                  "consumption_preference_id": "consumption_preferences_books_entertainment_magazines",
                  "name": "Likely to read entertainment magazines",
                  "score": 0
                },
                {
                  "consumption_preference_id": "consumption_preferences_books_non_fiction",
                  "name": "Likely to read non-fiction books",
                  "score": 0
                },
                {
                  "consumption_preference_id": "consumption_preferences_books_financial_investing",
                  "name": "Likely to read financial investment books",
                  "score": 1
                },
                {
                  "consumption_preference_id": "consumption_preferences_books_autobiographies",
                  "name": "Likely to read autobiographical books",
                  "score": 0
                }
              ]
            },
            {
              "consumption_preference_category_id": "consumption_preferences_volunteering",
              "name": "Volunteering Preferences",
              "consumption_preferences": [
                {
                  "consumption_preference_id": "consumption_preferences_volunteer",
                  "name": "Likely to volunteer for social causes",
                  "score": 0
                }
              ]
            }
          ],
          "warnings": []
        }
    },
    {
        id: "DonFranciscoTV",
        lang: "es",
        imagePath: "/images/twitter/DonFranciscoTV.jpg",
        profile: {
          "word_count": 12930,
          "processed_language": "es",
          "personality": [
            {
              "trait_id": "big5_openness",
              "name": "Openness",
              "category": "personality",
              "percentile": 0.9965599852161433,
              "children": [
                {
                  "trait_id": "facet_adventurousness",
                  "name": "Adventurousness",
                  "category": "personality",
                  "percentile": 0.8649624405221095
                },
                {
                  "trait_id": "facet_artistic_interests",
                  "name": "Artistic interests",
                  "category": "personality",
                  "percentile": 0.9004253590243274
                },
                {
                  "trait_id": "facet_emotionality",
                  "name": "Emotionality",
                  "category": "personality",
                  "percentile": 0.8724898327115851
                },
                {
                  "trait_id": "facet_imagination",
                  "name": "Imagination",
                  "category": "personality",
                  "percentile": 0.29097870132628345
                },
                {
                  "trait_id": "facet_intellect",
                  "name": "Intellect",
                  "category": "personality",
                  "percentile": 0.6334088346595954
                },
                {
                  "trait_id": "facet_liberalism",
                  "name": "Authority-challenging",
                  "category": "personality",
                  "percentile": 0.46582982279761204
                }
              ]
            },
            {
              "trait_id": "big5_conscientiousness",
              "name": "Conscientiousness",
              "category": "personality",
              "percentile": 0.9424363504683803,
              "children": [
                {
                  "trait_id": "facet_achievement_striving",
                  "name": "Achievement striving",
                  "category": "personality",
                  "percentile": 0.9999950908870002
                },
                {
                  "trait_id": "facet_cautiousness",
                  "name": "Cautiousness",
                  "category": "personality",
                  "percentile": 0.6707523250015972
                },
                {
                  "trait_id": "facet_dutifulness",
                  "name": "Dutifulness",
                  "category": "personality",
                  "percentile": 0.911342589401333
                },
                {
                  "trait_id": "facet_orderliness",
                  "name": "Orderliness",
                  "category": "personality",
                  "percentile": 0.8625352199314595
                },
                {
                  "trait_id": "facet_self_discipline",
                  "name": "Self-discipline",
                  "category": "personality",
                  "percentile": 0.8573709430049072
                },
                {
                  "trait_id": "facet_self_efficacy",
                  "name": "Self-efficacy",
                  "category": "personality",
                  "percentile": 0.7734342676895227
                }
              ]
            },
            {
              "trait_id": "big5_extraversion",
              "name": "Extraversion",
              "category": "personality",
              "percentile": 0.12878842130159507,
              "children": [
                {
                  "trait_id": "facet_activity_level",
                  "name": "Activity level",
                  "category": "personality",
                  "percentile": 0.5583623718569429
                },
                {
                  "trait_id": "facet_assertiveness",
                  "name": "Assertiveness",
                  "category": "personality",
                  "percentile": 0.7480320041303965
                },
                {
                  "trait_id": "facet_cheerfulness",
                  "name": "Cheerfulness",
                  "category": "personality",
                  "percentile": 0.19547204498612292
                },
                {
                  "trait_id": "facet_excitement_seeking",
                  "name": "Excitement-seeking",
                  "category": "personality",
                  "percentile": 0.502863546685085
                },
                {
                  "trait_id": "facet_friendliness",
                  "name": "Outgoing",
                  "category": "personality",
                  "percentile": 0.6797246579488931
                },
                {
                  "trait_id": "facet_gregariousness",
                  "name": "Gregariousness",
                  "category": "personality",
                  "percentile": 0.5254689500390154
                }
              ]
            },
            {
              "trait_id": "big5_agreeableness",
              "name": "Agreeableness",
              "category": "personality",
              "percentile": 0.9680750074033599,
              "children": [
                {
                  "trait_id": "facet_altruism",
                  "name": "Altruism",
                  "category": "personality",
                  "percentile": 0.9012935209482639
                },
                {
                  "trait_id": "facet_cooperation",
                  "name": "Cooperation",
                  "category": "personality",
                  "percentile": 0.7641529380585883
                },
                {
                  "trait_id": "facet_modesty",
                  "name": "Modesty",
                  "category": "personality",
                  "percentile": 0.3999201810418651
                },
                {
                  "trait_id": "facet_morality",
                  "name": "Uncompromising",
                  "category": "personality",
                  "percentile": 0.9355014895572733
                },
                {
                  "trait_id": "facet_sympathy",
                  "name": "Sympathy",
                  "category": "personality",
                  "percentile": 0.999706785041975
                },
                {
                  "trait_id": "facet_trust",
                  "name": "Trust",
                  "category": "personality",
                  "percentile": 0.6993975426912754
                }
              ]
            },
            {
              "trait_id": "big5_neuroticism",
              "name": "Emotional range",
              "category": "personality",
              "percentile": 0.23929978724500173,
              "children": [
                {
                  "trait_id": "facet_anger",
                  "name": "Fiery",
                  "category": "personality",
                  "percentile": 0.5906532453190162
                },
                {
                  "trait_id": "facet_anxiety",
                  "name": "Prone to worry",
                  "category": "personality",
                  "percentile": 0.31220067535623247
                },
                {
                  "trait_id": "facet_depression",
                  "name": "Melancholy",
                  "category": "personality",
                  "percentile": 0.3154626534886723
                },
                {
                  "trait_id": "facet_immoderation",
                  "name": "Immoderation",
                  "category": "personality",
                  "percentile": 0.2779785921745229
                },
                {
                  "trait_id": "facet_self_consciousness",
                  "name": "Self-consciousness",
                  "category": "personality",
                  "percentile": 0.45236003038997225
                },
                {
                  "trait_id": "facet_vulnerability",
                  "name": "Susceptible to stress",
                  "category": "personality",
                  "percentile": 0.40756273936092713
                }
              ]
            }
          ],
          "needs": [
            {
              "trait_id": "need_challenge",
              "name": "Challenge",
              "category": "needs",
              "percentile": 0.3967996812908396
            },
            {
              "trait_id": "need_closeness",
              "name": "Closeness",
              "category": "needs",
              "percentile": 0.9542588714053879
            },
            {
              "trait_id": "need_curiosity",
              "name": "Curiosity",
              "category": "needs",
              "percentile": 0.4325276030395064
            },
            {
              "trait_id": "need_excitement",
              "name": "Excitement",
              "category": "needs",
              "percentile": 0.352921118767202
            },
            {
              "trait_id": "need_harmony",
              "name": "Harmony",
              "category": "needs",
              "percentile": 0.9411552127656785
            },
            {
              "trait_id": "need_ideal",
              "name": "Ideal",
              "category": "needs",
              "percentile": 0.2770130181916747
            },
            {
              "trait_id": "need_liberty",
              "name": "Liberty",
              "category": "needs",
              "percentile": 0.44538693012407604
            },
            {
              "trait_id": "need_love",
              "name": "Love",
              "category": "needs",
              "percentile": 0.3400101713902205
            },
            {
              "trait_id": "need_practicality",
              "name": "Practicality",
              "category": "needs",
              "percentile": 0.5768167663962116
            },
            {
              "trait_id": "need_self_expression",
              "name": "Self-expression",
              "category": "needs",
              "percentile": 0.05172458183011919
            },
            {
              "trait_id": "need_stability",
              "name": "Stability",
              "category": "needs",
              "percentile": 0.8699411961270979
            },
            {
              "trait_id": "need_structure",
              "name": "Structure",
              "category": "needs",
              "percentile": 0.24461631162101005
            }
          ],
          "values": [
            {
              "trait_id": "value_conservation",
              "name": "Conservation",
              "category": "values",
              "percentile": 0.7057273610213284
            },
            {
              "trait_id": "value_openness_to_change",
              "name": "Openness to change",
              "category": "values",
              "percentile": 0.1534801251977338
            },
            {
              "trait_id": "value_hedonism",
              "name": "Hedonism",
              "category": "values",
              "percentile": 0.14539421720911466
            },
            {
              "trait_id": "value_self_enhancement",
              "name": "Self-enhancement",
              "category": "values",
              "percentile": 0.03227364545088601
            },
            {
              "trait_id": "value_self_transcendence",
              "name": "Self-transcendence",
              "category": "values",
              "percentile": 0.7022229640179992
            }
          ],
          "behavior": [
            {
              "trait_id": "behavior_sunday",
              "name": "Sunday",
              "category": "behavior",
              "percentage": 0.10989010989010989
            },
            {
              "trait_id": "behavior_monday",
              "name": "Monday",
              "category": "behavior",
              "percentage": 0.11488511488511488
            },
            {
              "trait_id": "behavior_tuesday",
              "name": "Tuesday",
              "category": "behavior",
              "percentage": 0.24675324675324675
            },
            {
              "trait_id": "behavior_wednesday",
              "name": "Wednesday",
              "category": "behavior",
              "percentage": 0.2087912087912088
            },
            {
              "trait_id": "behavior_thursday",
              "name": "Thursday",
              "category": "behavior",
              "percentage": 0.1848151848151848
            },
            {
              "trait_id": "behavior_friday",
              "name": "Friday",
              "category": "behavior",
              "percentage": 0.04995004995004995
            },
            {
              "trait_id": "behavior_saturday",
              "name": "Saturday",
              "category": "behavior",
              "percentage": 0.08491508491508491
            },
            {
              "trait_id": "behavior_0000",
              "name": "0:00 am",
              "category": "behavior",
              "percentage": 0.01098901098901099
            },
            {
              "trait_id": "behavior_0100",
              "name": "1:00 am",
              "category": "behavior",
              "percentage": 0.04795204795204795
            },
            {
              "trait_id": "behavior_0200",
              "name": "2:00 am",
              "category": "behavior",
              "percentage": 0.004995004995004995
            },
            {
              "trait_id": "behavior_0300",
              "name": "3:00 am",
              "category": "behavior",
              "percentage": 0.01998001998001998
            },
            {
              "trait_id": "behavior_0400",
              "name": "4:00 am",
              "category": "behavior",
              "percentage": 0.029970029970029972
            },
            {
              "trait_id": "behavior_0500",
              "name": "5:00 am",
              "category": "behavior",
              "percentage": 0.04495504495504495
            },
            {
              "trait_id": "behavior_0600",
              "name": "6:00 am",
              "category": "behavior",
              "percentage": 0.004995004995004995
            },
            {
              "trait_id": "behavior_0700",
              "name": "7:00 am",
              "category": "behavior",
              "percentage": 0
            },
            {
              "trait_id": "behavior_0800",
              "name": "8:00 am",
              "category": "behavior",
              "percentage": 0
            },
            {
              "trait_id": "behavior_0900",
              "name": "9:00 am",
              "category": "behavior",
              "percentage": 0
            },
            {
              "trait_id": "behavior_1000",
              "name": "10:00 am",
              "category": "behavior",
              "percentage": 0
            },
            {
              "trait_id": "behavior_1100",
              "name": "11:00 am",
              "category": "behavior",
              "percentage": 0.004995004995004995
            },
            {
              "trait_id": "behavior_1200",
              "name": "12:00 pm",
              "category": "behavior",
              "percentage": 0.1038961038961039
            },
            {
              "trait_id": "behavior_1300",
              "name": "1:00 pm",
              "category": "behavior",
              "percentage": 0.16983016983016982
            },
            {
              "trait_id": "behavior_1400",
              "name": "2:00 pm",
              "category": "behavior",
              "percentage": 0.07492507492507493
            },
            {
              "trait_id": "behavior_1500",
              "name": "3:00 pm",
              "category": "behavior",
              "percentage": 0.08591408591408592
            },
            {
              "trait_id": "behavior_1600",
              "name": "4:00 pm",
              "category": "behavior",
              "percentage": 0.052947052947052944
            },
            {
              "trait_id": "behavior_1700",
              "name": "5:00 pm",
              "category": "behavior",
              "percentage": 0.0959040959040959
            },
            {
              "trait_id": "behavior_1800",
              "name": "6:00 pm",
              "category": "behavior",
              "percentage": 0.04995004995004995
            },
            {
              "trait_id": "behavior_1900",
              "name": "7:00 pm",
              "category": "behavior",
              "percentage": 0.030969030969030968
            },
            {
              "trait_id": "behavior_2000",
              "name": "8:00 pm",
              "category": "behavior",
              "percentage": 0.0989010989010989
            },
            {
              "trait_id": "behavior_2100",
              "name": "9:00 pm",
              "category": "behavior",
              "percentage": 0.00999000999000999
            },
            {
              "trait_id": "behavior_2200",
              "name": "10:00 pm",
              "category": "behavior",
              "percentage": 0.03196803196803197
            },
            {
              "trait_id": "behavior_2300",
              "name": "11:00 pm",
              "category": "behavior",
              "percentage": 0.025974025974025976
            }
          ],
          "consumption_preferences": [
            {
              "consumption_preference_category_id": "consumption_preferences_shopping",
              "name": "Purchasing Preferences",
              "consumption_preferences": [
                {
                  "consumption_preference_id": "consumption_preferences_automobile_ownership_cost",
                  "name": "Likely to be sensitive to ownership cost when buying automobiles",
                  "score": 0
                },
                {
                  "consumption_preference_id": "consumption_preferences_automobile_safety",
                  "name": "Likely to prefer safety when buying automobiles",
                  "score": 1
                },
                {
                  "consumption_preference_id": "consumption_preferences_clothes_quality",
                  "name": "Likely to prefer quality when buying clothes",
                  "score": 0
                },
                {
                  "consumption_preference_id": "consumption_preferences_clothes_style",
                  "name": "Likely to prefer style when buying clothes",
                  "score": 0
                },
                {
                  "consumption_preference_id": "consumption_preferences_clothes_comfort",
                  "name": "Likely to prefer comfort when buying clothes",
                  "score": 1
                },
                {
                  "consumption_preference_id": "consumption_preferences_influence_brand_name",
                  "name": "Likely to be influenced by brand name when making product purchases",
                  "score": 0.5
                },
                {
                  "consumption_preference_id": "consumption_preferences_influence_utility",
                  "name": "Likely to be influenced by product utility when making product purchases",
                  "score": 1
                },
                {
                  "consumption_preference_id": "consumption_preferences_influence_online_ads",
                  "name": "Likely to be influenced by online ads when making product purchases",
                  "score": 1
                },
                {
                  "consumption_preference_id": "consumption_preferences_influence_social_media",
                  "name": "Likely to be influenced by social media when making product purchases",
                  "score": 1
                },
                {
                  "consumption_preference_id": "consumption_preferences_influence_family_members",
                  "name": "Likely to be influenced by family when making product purchases",
                  "score": 1
                },
                {
                  "consumption_preference_id": "consumption_preferences_spur_of_moment",
                  "name": "Likely to indulge in spur of the moment purchases",
                  "score": 0.5
                },
                {
                  "consumption_preference_id": "consumption_preferences_credit_card_payment",
                  "name": "Likely to prefer using credit cards for shopping",
                  "score": 1
                }
              ]
            },
            {
              "consumption_preference_category_id": "consumption_preferences_health_and_activity",
              "name": "Health & Activity Preferences",
              "consumption_preferences": [
                {
                  "consumption_preference_id": "consumption_preferences_eat_out",
                  "name": "Likely to eat out frequently",
                  "score": 0
                },
                {
                  "consumption_preference_id": "consumption_preferences_gym_membership",
                  "name": "Likely to have a gym membership",
                  "score": 0
                },
                {
                  "consumption_preference_id": "consumption_preferences_outdoor",
                  "name": "Likely to like outdoor activities",
                  "score": 0
                }
              ]
            },
            {
              "consumption_preference_category_id": "consumption_preferences_environmental_concern",
              "name": "Environmental Concern Preferences",
              "consumption_preferences": [
                {
                  "consumption_preference_id": "consumption_preferences_concerned_environment",
                  "name": "Likely to be concerned about the environment",
                  "score": 0.5
                }
              ]
            },
            {
              "consumption_preference_category_id": "consumption_preferences_entrepreneurship",
              "name": "Entrepreneurship Preferences",
              "consumption_preferences": [
                {
                  "consumption_preference_id": "consumption_preferences_start_business",
                  "name": "Likely to consider starting a business in next few years",
                  "score": 0
                }
              ]
            },
            {
              "consumption_preference_category_id": "consumption_preferences_movie",
              "name": "Movie Preferences",
              "consumption_preferences": [
                {
                  "consumption_preference_id": "consumption_preferences_movie_romance",
                  "name": "Likely to like romance movies",
                  "score": 1
                },
                {
                  "consumption_preference_id": "consumption_preferences_movie_adventure",
                  "name": "Likely to like adventure movies",
                  "score": 1
                },
                {
                  "consumption_preference_id": "consumption_preferences_movie_horror",
                  "name": "Likely to like horror movies",
                  "score": 1
                },
                {
                  "consumption_preference_id": "consumption_preferences_movie_musical",
                  "name": "Likely to like musical movies",
                  "score": 0
                },
                {
                  "consumption_preference_id": "consumption_preferences_movie_historical",
                  "name": "Likely to like historical movies",
                  "score": 0
                },
                {
                  "consumption_preference_id": "consumption_preferences_movie_science_fiction",
                  "name": "Likely to like science-fiction movies",
                  "score": 0
                },
                {
                  "consumption_preference_id": "consumption_preferences_movie_war",
                  "name": "Likely to like war movies",
                  "score": 0
                },
                {
                  "consumption_preference_id": "consumption_preferences_movie_drama",
                  "name": "Likely to like drama movies",
                  "score": 1
                },
                {
                  "consumption_preference_id": "consumption_preferences_movie_action",
                  "name": "Likely to like action movies",
                  "score": 0
                },
                {
                  "consumption_preference_id": "consumption_preferences_movie_documentary",
                  "name": "Likely to like documentary movies",
                  "score": 0
                }
              ]
            },
            {
              "consumption_preference_category_id": "consumption_preferences_music",
              "name": "Music Preferences",
              "consumption_preferences": [
                {
                  "consumption_preference_id": "consumption_preferences_music_rap",
                  "name": "Likely to like rap music",
                  "score": 0
                },
                {
                  "consumption_preference_id": "consumption_preferences_music_country",
                  "name": "Likely to like country music",
                  "score": 1
                },
                {
                  "consumption_preference_id": "consumption_preferences_music_r_b",
                  "name": "Likely to like R&B music",
                  "score": 1
                },
                {
                  "consumption_preference_id": "consumption_preferences_music_hip_hop",
                  "name": "Likely to like hip hop music",
                  "score": 1
                },
                {
                  "consumption_preference_id": "consumption_preferences_music_live_event",
                  "name": "Likely to attend live musical events",
                  "score": 0
                },
                {
                  "consumption_preference_id": "consumption_preferences_music_playing",
                  "name": "Likely to have experience playing music",
                  "score": 0
                },
                {
                  "consumption_preference_id": "consumption_preferences_music_latin",
                  "name": "Likely to like Latin music",
                  "score": 0.5
                },
                {
                  "consumption_preference_id": "consumption_preferences_music_rock",
                  "name": "Likely to like rock music",
                  "score": 0.5
                },
                {
                  "consumption_preference_id": "consumption_preferences_music_classical",
                  "name": "Likely to like classical music",
                  "score": 0
                }
              ]
            },
            {
              "consumption_preference_category_id": "consumption_preferences_reading",
              "name": "Reading Preferences",
              "consumption_preferences": [
                {
                  "consumption_preference_id": "consumption_preferences_read_frequency",
                  "name": "Likely to read often",
                  "score": 1
                },
                {
                  "consumption_preference_id": "consumption_preferences_books_entertainment_magazines",
                  "name": "Likely to read entertainment magazines",
                  "score": 1
                },
                {
                  "consumption_preference_id": "consumption_preferences_books_non_fiction",
                  "name": "Likely to read non-fiction books",
                  "score": 0
                },
                {
                  "consumption_preference_id": "consumption_preferences_books_financial_investing",
                  "name": "Likely to read financial investment books",
                  "score": 0
                },
                {
                  "consumption_preference_id": "consumption_preferences_books_autobiographies",
                  "name": "Likely to read autobiographical books",
                  "score": 0
                }
              ]
            },
            {
              "consumption_preference_category_id": "consumption_preferences_volunteering",
              "name": "Volunteering Preferences",
              "consumption_preferences": [
                {
                  "consumption_preference_id": "consumption_preferences_volunteer",
                  "name": "Likely to volunteer for social causes",
                  "score": 0
                }
              ]
            }
          ],
          "warnings": []
        }
    },
    {
        id: "pontifex_es",
        lang: "es",
        imagePath: "/images/twitter/pontifex_es.jpg",
        profile: {
          "word_count": 35039,
          "processed_language": "es",
          "personality": [
            {
              "trait_id": "big5_openness",
              "name": "Openness",
              "category": "personality",
              "percentile": 0.9908479411263954,
              "children": [
                {
                  "trait_id": "facet_adventurousness",
                  "name": "Adventurousness",
                  "category": "personality",
                  "percentile": 0.904711947192278
                },
                {
                  "trait_id": "facet_artistic_interests",
                  "name": "Artistic interests",
                  "category": "personality",
                  "percentile": 0.9978071901084234
                },
                {
                  "trait_id": "facet_emotionality",
                  "name": "Emotionality",
                  "category": "personality",
                  "percentile": 0.8214803886709241
                },
                {
                  "trait_id": "facet_imagination",
                  "name": "Imagination",
                  "category": "personality",
                  "percentile": 0.6390466257839603
                },
                {
                  "trait_id": "facet_intellect",
                  "name": "Intellect",
                  "category": "personality",
                  "percentile": 0.8573551303024011
                },
                {
                  "trait_id": "facet_liberalism",
                  "name": "Authority-challenging",
                  "category": "personality",
                  "percentile": 0.024034325414907354
                }
              ]
            },
            {
              "trait_id": "big5_conscientiousness",
              "name": "Conscientiousness",
              "category": "personality",
              "percentile": 0.9884466980692113,
              "children": [
                {
                  "trait_id": "facet_achievement_striving",
                  "name": "Achievement striving",
                  "category": "personality",
                  "percentile": 0.9951148647740573
                },
                {
                  "trait_id": "facet_cautiousness",
                  "name": "Cautiousness",
                  "category": "personality",
                  "percentile": 0.856832233039848
                },
                {
                  "trait_id": "facet_dutifulness",
                  "name": "Dutifulness",
                  "category": "personality",
                  "percentile": 0.7699203978742388
                },
                {
                  "trait_id": "facet_orderliness",
                  "name": "Orderliness",
                  "category": "personality",
                  "percentile": 0.8679547808482388
                },
                {
                  "trait_id": "facet_self_discipline",
                  "name": "Self-discipline",
                  "category": "personality",
                  "percentile": 0.9788521449925296
                },
                {
                  "trait_id": "facet_self_efficacy",
                  "name": "Self-efficacy",
                  "category": "personality",
                  "percentile": 0.9156601755287503
                }
              ]
            },
            {
              "trait_id": "big5_extraversion",
              "name": "Extraversion",
              "category": "personality",
              "percentile": 0.966573700650426,
              "children": [
                {
                  "trait_id": "facet_activity_level",
                  "name": "Activity level",
                  "category": "personality",
                  "percentile": 0.962642269772295
                },
                {
                  "trait_id": "facet_assertiveness",
                  "name": "Assertiveness",
                  "category": "personality",
                  "percentile": 0.831688359606084
                },
                {
                  "trait_id": "facet_cheerfulness",
                  "name": "Cheerfulness",
                  "category": "personality",
                  "percentile": 0.3350894362596366
                },
                {
                  "trait_id": "facet_excitement_seeking",
                  "name": "Excitement-seeking",
                  "category": "personality",
                  "percentile": 0.27388860018140027
                },
                {
                  "trait_id": "facet_friendliness",
                  "name": "Outgoing",
                  "category": "personality",
                  "percentile": 0.7331312309127911
                },
                {
                  "trait_id": "facet_gregariousness",
                  "name": "Gregariousness",
                  "category": "personality",
                  "percentile": 0.4179520624697454
                }
              ]
            },
            {
              "trait_id": "big5_agreeableness",
              "name": "Agreeableness",
              "category": "personality",
              "percentile": 0.9891803551463436,
              "children": [
                {
                  "trait_id": "facet_altruism",
                  "name": "Altruism",
                  "category": "personality",
                  "percentile": 0.9702495521677011
                },
                {
                  "trait_id": "facet_cooperation",
                  "name": "Cooperation",
                  "category": "personality",
                  "percentile": 0.9029419927011588
                },
                {
                  "trait_id": "facet_modesty",
                  "name": "Modesty",
                  "category": "personality",
                  "percentile": 0.2745801546685792
                },
                {
                  "trait_id": "facet_morality",
                  "name": "Uncompromising",
                  "category": "personality",
                  "percentile": 0.9725935600481782
                },
                {
                  "trait_id": "facet_sympathy",
                  "name": "Sympathy",
                  "category": "personality",
                  "percentile": 0.9998263148941
                },
                {
                  "trait_id": "facet_trust",
                  "name": "Trust",
                  "category": "personality",
                  "percentile": 0.9165650862183052
                }
              ]
            },
            {
              "trait_id": "big5_neuroticism",
              "name": "Emotional range",
              "category": "personality",
              "percentile": 0.16066257112463356,
              "children": [
                {
                  "trait_id": "facet_anger",
                  "name": "Fiery",
                  "category": "personality",
                  "percentile": 0.5907189451204863
                },
                {
                  "trait_id": "facet_anxiety",
                  "name": "Prone to worry",
                  "category": "personality",
                  "percentile": 0.018585788644091716
                },
                {
                  "trait_id": "facet_depression",
                  "name": "Melancholy",
                  "category": "personality",
                  "percentile": 0.14737159981792697
                },
                {
                  "trait_id": "facet_immoderation",
                  "name": "Immoderation",
                  "category": "personality",
                  "percentile": 0.4856238077019195
                },
                {
                  "trait_id": "facet_self_consciousness",
                  "name": "Self-consciousness",
                  "category": "personality",
                  "percentile": 0.3311084665931633
                },
                {
                  "trait_id": "facet_vulnerability",
                  "name": "Susceptible to stress",
                  "category": "personality",
                  "percentile": 0.4689826901887899
                }
              ]
            }
          ],
          "needs": [
            {
              "trait_id": "need_challenge",
              "name": "Challenge",
              "category": "needs",
              "percentile": 0.27585749983421987
            },
            {
              "trait_id": "need_closeness",
              "name": "Closeness",
              "category": "needs",
              "percentile": 0.7874021524778134
            },
            {
              "trait_id": "need_curiosity",
              "name": "Curiosity",
              "category": "needs",
              "percentile": 0.5856836818268676
            },
            {
              "trait_id": "need_excitement",
              "name": "Excitement",
              "category": "needs",
              "percentile": 0.0951683360751765
            },
            {
              "trait_id": "need_harmony",
              "name": "Harmony",
              "category": "needs",
              "percentile": 0.991449431628532
            },
            {
              "trait_id": "need_ideal",
              "name": "Ideal",
              "category": "needs",
              "percentile": 0.3408047178209114
            },
            {
              "trait_id": "need_liberty",
              "name": "Liberty",
              "category": "needs",
              "percentile": 0.5683155654945726
            },
            {
              "trait_id": "need_love",
              "name": "Love",
              "category": "needs",
              "percentile": 0.9538976354186405
            },
            {
              "trait_id": "need_practicality",
              "name": "Practicality",
              "category": "needs",
              "percentile": 0.7304252217656035
            },
            {
              "trait_id": "need_self_expression",
              "name": "Self-expression",
              "category": "needs",
              "percentile": 0.3230883097234786
            },
            {
              "trait_id": "need_stability",
              "name": "Stability",
              "category": "needs",
              "percentile": 0.9262051232803428
            },
            {
              "trait_id": "need_structure",
              "name": "Structure",
              "category": "needs",
              "percentile": 0.7814992434312298
            }
          ],
          "values": [
            {
              "trait_id": "value_conservation",
              "name": "Conservation",
              "category": "values",
              "percentile": 0.9887771816219854
            },
            {
              "trait_id": "value_openness_to_change",
              "name": "Openness to change",
              "category": "values",
              "percentile": 0.2634152393192255
            },
            {
              "trait_id": "value_hedonism",
              "name": "Hedonism",
              "category": "values",
              "percentile": 0.13235169739749258
            },
            {
              "trait_id": "value_self_enhancement",
              "name": "Self-enhancement",
              "category": "values",
              "percentile": 0.2593096102461636
            },
            {
              "trait_id": "value_self_transcendence",
              "name": "Self-transcendence",
              "category": "values",
              "percentile": 0.8647318472428795
            }
          ],
          "behavior": [
            {
              "trait_id": "behavior_sunday",
              "name": "Sunday",
              "category": "behavior",
              "percentage": 0.04997501249375312
            },
            {
              "trait_id": "behavior_monday",
              "name": "Monday",
              "category": "behavior",
              "percentage": 0.054972513743128434
            },
            {
              "trait_id": "behavior_tuesday",
              "name": "Tuesday",
              "category": "behavior",
              "percentage": 0.15992003998001
            },
            {
              "trait_id": "behavior_wednesday",
              "name": "Wednesday",
              "category": "behavior",
              "percentage": 0.05547226386806597
            },
            {
              "trait_id": "behavior_thursday",
              "name": "Thursday",
              "category": "behavior",
              "percentage": 0.3598200899550225
            },
            {
              "trait_id": "behavior_friday",
              "name": "Friday",
              "category": "behavior",
              "percentage": 0.18490754622688654
            },
            {
              "trait_id": "behavior_saturday",
              "name": "Saturday",
              "category": "behavior",
              "percentage": 0.13493253373313344
            },
            {
              "trait_id": "behavior_0000",
              "name": "0:00 am",
              "category": "behavior",
              "percentage": 0.029985007496251874
            },
            {
              "trait_id": "behavior_0100",
              "name": "1:00 am",
              "category": "behavior",
              "percentage": 0.02498750624687656
            },
            {
              "trait_id": "behavior_0200",
              "name": "2:00 am",
              "category": "behavior",
              "percentage": 0.01999000499750125
            },
            {
              "trait_id": "behavior_0300",
              "name": "3:00 am",
              "category": "behavior",
              "percentage": 0.014992503748125937
            },
            {
              "trait_id": "behavior_0400",
              "name": "4:00 am",
              "category": "behavior",
              "percentage": 0.01999000499750125
            },
            {
              "trait_id": "behavior_0500",
              "name": "5:00 am",
              "category": "behavior",
              "percentage": 0.01999000499750125
            },
            {
              "trait_id": "behavior_0600",
              "name": "6:00 am",
              "category": "behavior",
              "percentage": 0.01999000499750125
            },
            {
              "trait_id": "behavior_0700",
              "name": "7:00 am",
              "category": "behavior",
              "percentage": 0.004997501249375313
            },
            {
              "trait_id": "behavior_0800",
              "name": "8:00 am",
              "category": "behavior",
              "percentage": 0.14992503748125938
            },
            {
              "trait_id": "behavior_0900",
              "name": "9:00 am",
              "category": "behavior",
              "percentage": 0.17991004497751126
            },
            {
              "trait_id": "behavior_1000",
              "name": "10:00 am",
              "category": "behavior",
              "percentage": 0.09495252373813093
            },
            {
              "trait_id": "behavior_1100",
              "name": "11:00 am",
              "category": "behavior",
              "percentage": 0.07496251874062969
            },
            {
              "trait_id": "behavior_1200",
              "name": "12:00 pm",
              "category": "behavior",
              "percentage": 0.029985007496251874
            },
            {
              "trait_id": "behavior_1300",
              "name": "1:00 pm",
              "category": "behavior",
              "percentage": 0.01999000499750125
            },
            {
              "trait_id": "behavior_1400",
              "name": "2:00 pm",
              "category": "behavior",
              "percentage": 0.014992503748125937
            },
            {
              "trait_id": "behavior_1500",
              "name": "3:00 pm",
              "category": "behavior",
              "percentage": 0.02048975512243878
            },
            {
              "trait_id": "behavior_1600",
              "name": "4:00 pm",
              "category": "behavior",
              "percentage": 0.02498750624687656
            },
            {
              "trait_id": "behavior_1700",
              "name": "5:00 pm",
              "category": "behavior",
              "percentage": 0.029985007496251874
            },
            {
              "trait_id": "behavior_1800",
              "name": "6:00 pm",
              "category": "behavior",
              "percentage": 0.029985007496251874
            },
            {
              "trait_id": "behavior_1900",
              "name": "7:00 pm",
              "category": "behavior",
              "percentage": 0.03498250874562719
            },
            {
              "trait_id": "behavior_2000",
              "name": "8:00 pm",
              "category": "behavior",
              "percentage": 0.03498250874562719
            },
            {
              "trait_id": "behavior_2100",
              "name": "9:00 pm",
              "category": "behavior",
              "percentage": 0.044977511244377814
            },
            {
              "trait_id": "behavior_2200",
              "name": "10:00 pm",
              "category": "behavior",
              "percentage": 0.0399800099950025
            },
            {
              "trait_id": "behavior_2300",
              "name": "11:00 pm",
              "category": "behavior",
              "percentage": 0.01999000499750125
            }
          ],
          "consumption_preferences": [
            {
              "consumption_preference_category_id": "consumption_preferences_shopping",
              "name": "Purchasing Preferences",
              "consumption_preferences": [
                {
                  "consumption_preference_id": "consumption_preferences_automobile_ownership_cost",
                  "name": "Likely to be sensitive to ownership cost when buying automobiles",
                  "score": 0
                },
                {
                  "consumption_preference_id": "consumption_preferences_automobile_safety",
                  "name": "Likely to prefer safety when buying automobiles",
                  "score": 1
                },
                {
                  "consumption_preference_id": "consumption_preferences_clothes_quality",
                  "name": "Likely to prefer quality when buying clothes",
                  "score": 0
                },
                {
                  "consumption_preference_id": "consumption_preferences_clothes_style",
                  "name": "Likely to prefer style when buying clothes",
                  "score": 0
                },
                {
                  "consumption_preference_id": "consumption_preferences_clothes_comfort",
                  "name": "Likely to prefer comfort when buying clothes",
                  "score": 0
                },
                {
                  "consumption_preference_id": "consumption_preferences_influence_brand_name",
                  "name": "Likely to be influenced by brand name when making product purchases",
                  "score": 0.5
                },
                {
                  "consumption_preference_id": "consumption_preferences_influence_utility",
                  "name": "Likely to be influenced by product utility when making product purchases",
                  "score": 0.5
                },
                {
                  "consumption_preference_id": "consumption_preferences_influence_online_ads",
                  "name": "Likely to be influenced by online ads when making product purchases",
                  "score": 1
                },
                {
                  "consumption_preference_id": "consumption_preferences_influence_social_media",
                  "name": "Likely to be influenced by social media when making product purchases",
                  "score": 1
                },
                {
                  "consumption_preference_id": "consumption_preferences_influence_family_members",
                  "name": "Likely to be influenced by family when making product purchases",
                  "score": 1
                },
                {
                  "consumption_preference_id": "consumption_preferences_spur_of_moment",
                  "name": "Likely to indulge in spur of the moment purchases",
                  "score": 0.5
                },
                {
                  "consumption_preference_id": "consumption_preferences_credit_card_payment",
                  "name": "Likely to prefer using credit cards for shopping",
                  "score": 1
                }
              ]
            },
            {
              "consumption_preference_category_id": "consumption_preferences_health_and_activity",
              "name": "Health & Activity Preferences",
              "consumption_preferences": [
                {
                  "consumption_preference_id": "consumption_preferences_eat_out",
                  "name": "Likely to eat out frequently",
                  "score": 0
                },
                {
                  "consumption_preference_id": "consumption_preferences_gym_membership",
                  "name": "Likely to have a gym membership",
                  "score": 0
                },
                {
                  "consumption_preference_id": "consumption_preferences_outdoor",
                  "name": "Likely to like outdoor activities",
                  "score": 0
                }
              ]
            },
            {
              "consumption_preference_category_id": "consumption_preferences_environmental_concern",
              "name": "Environmental Concern Preferences",
              "consumption_preferences": [
                {
                  "consumption_preference_id": "consumption_preferences_concerned_environment",
                  "name": "Likely to be concerned about the environment",
                  "score": 0.5
                }
              ]
            },
            {
              "consumption_preference_category_id": "consumption_preferences_entrepreneurship",
              "name": "Entrepreneurship Preferences",
              "consumption_preferences": [
                {
                  "consumption_preference_id": "consumption_preferences_start_business",
                  "name": "Likely to consider starting a business in next few years",
                  "score": 0.5
                }
              ]
            },
            {
              "consumption_preference_category_id": "consumption_preferences_movie",
              "name": "Movie Preferences",
              "consumption_preferences": [
                {
                  "consumption_preference_id": "consumption_preferences_movie_romance",
                  "name": "Likely to like romance movies",
                  "score": 1
                },
                {
                  "consumption_preference_id": "consumption_preferences_movie_adventure",
                  "name": "Likely to like adventure movies",
                  "score": 0
                },
                {
                  "consumption_preference_id": "consumption_preferences_movie_horror",
                  "name": "Likely to like horror movies",
                  "score": 1
                },
                {
                  "consumption_preference_id": "consumption_preferences_movie_musical",
                  "name": "Likely to like musical movies",
                  "score": 0
                },
                {
                  "consumption_preference_id": "consumption_preferences_movie_historical",
                  "name": "Likely to like historical movies",
                  "score": 0
                },
                {
                  "consumption_preference_id": "consumption_preferences_movie_science_fiction",
                  "name": "Likely to like science-fiction movies",
                  "score": 0
                },
                {
                  "consumption_preference_id": "consumption_preferences_movie_war",
                  "name": "Likely to like war movies",
                  "score": 0
                },
                {
                  "consumption_preference_id": "consumption_preferences_movie_drama",
                  "name": "Likely to like drama movies",
                  "score": 1
                },
                {
                  "consumption_preference_id": "consumption_preferences_movie_action",
                  "name": "Likely to like action movies",
                  "score": 0
                },
                {
                  "consumption_preference_id": "consumption_preferences_movie_documentary",
                  "name": "Likely to like documentary movies",
                  "score": 0
                }
              ]
            },
            {
              "consumption_preference_category_id": "consumption_preferences_music",
              "name": "Music Preferences",
              "consumption_preferences": [
                {
                  "consumption_preference_id": "consumption_preferences_music_rap",
                  "name": "Likely to like rap music",
                  "score": 1
                },
                {
                  "consumption_preference_id": "consumption_preferences_music_country",
                  "name": "Likely to like country music",
                  "score": 1
                },
                {
                  "consumption_preference_id": "consumption_preferences_music_r_b",
                  "name": "Likely to like R&B music",
                  "score": 1
                },
                {
                  "consumption_preference_id": "consumption_preferences_music_hip_hop",
                  "name": "Likely to like hip hop music",
                  "score": 1
                },
                {
                  "consumption_preference_id": "consumption_preferences_music_live_event",
                  "name": "Likely to attend live musical events",
                  "score": 0
                },
                {
                  "consumption_preference_id": "consumption_preferences_music_playing",
                  "name": "Likely to have experience playing music",
                  "score": 0
                },
                {
                  "consumption_preference_id": "consumption_preferences_music_latin",
                  "name": "Likely to like Latin music",
                  "score": 0
                },
                {
                  "consumption_preference_id": "consumption_preferences_music_rock",
                  "name": "Likely to like rock music",
                  "score": 0.5
                },
                {
                  "consumption_preference_id": "consumption_preferences_music_classical",
                  "name": "Likely to like classical music",
                  "score": 0
                }
              ]
            },
            {
              "consumption_preference_category_id": "consumption_preferences_reading",
              "name": "Reading Preferences",
              "consumption_preferences": [
                {
                  "consumption_preference_id": "consumption_preferences_read_frequency",
                  "name": "Likely to read often",
                  "score": 0.5
                },
                {
                  "consumption_preference_id": "consumption_preferences_books_entertainment_magazines",
                  "name": "Likely to read entertainment magazines",
                  "score": 1
                },
                {
                  "consumption_preference_id": "consumption_preferences_books_non_fiction",
                  "name": "Likely to read non-fiction books",
                  "score": 0
                },
                {
                  "consumption_preference_id": "consumption_preferences_books_financial_investing",
                  "name": "Likely to read financial investment books",
                  "score": 0
                },
                {
                  "consumption_preference_id": "consumption_preferences_books_autobiographies",
                  "name": "Likely to read autobiographical books",
                  "score": 0
                }
              ]
            },
            {
              "consumption_preference_category_id": "consumption_preferences_volunteering",
              "name": "Volunteering Preferences",
              "consumption_preferences": [
                {
                  "consumption_preference_id": "consumption_preferences_volunteer",
                  "name": "Likely to volunteer for social causes",
                  "score": 1
                }
              ]
            }
          ],
          "warnings": []
        }
    }
];

var teamAverage = undefined;

var teamHead = d3.select("#team-table-body")

var candidates = [
    {
        id: "trikaOfficial",
        lang: "ar",
        imagePath: "/images/twitter/trikaofficial.jpg",
        profile: {
          "word_count": 13053,
          "processed_language": "ar",
          "personality": [
            {
              "trait_id": "big5_openness",
              "name": "Openness",
              "category": "personality",
              "percentile": 0.3379112462908319,
              "children": [
                {
                  "trait_id": "facet_adventurousness",
                  "name": "Adventurousness",
                  "category": "personality",
                  "percentile": 0.5
                },
                {
                  "trait_id": "facet_artistic_interests",
                  "name": "Artistic interests",
                  "category": "personality",
                  "percentile": 0.797390917136013
                },
                {
                  "trait_id": "facet_emotionality",
                  "name": "Emotionality",
                  "category": "personality",
                  "percentile": 0.36758320948318157
                },
                {
                  "trait_id": "facet_imagination",
                  "name": "Imagination",
                  "category": "personality",
                  "percentile": 0.5
                },
                {
                  "trait_id": "facet_intellect",
                  "name": "Intellect",
                  "category": "personality",
                  "percentile": 0.5
                },
                {
                  "trait_id": "facet_liberalism",
                  "name": "Authority-challenging",
                  "category": "personality",
                  "percentile": 0.09342207288051063
                }
              ]
            },
            {
              "trait_id": "big5_conscientiousness",
              "name": "Conscientiousness",
              "category": "personality",
              "percentile": 0.9932257499560775,
              "children": [
                {
                  "trait_id": "facet_achievement_striving",
                  "name": "Achievement striving",
                  "category": "personality",
                  "percentile": 0.5
                },
                {
                  "trait_id": "facet_cautiousness",
                  "name": "Cautiousness",
                  "category": "personality",
                  "percentile": 0.9242611533802372
                },
                {
                  "trait_id": "facet_dutifulness",
                  "name": "Dutifulness",
                  "category": "personality",
                  "percentile": 0.5
                },
                {
                  "trait_id": "facet_orderliness",
                  "name": "Orderliness",
                  "category": "personality",
                  "percentile": 0.706465370663126
                },
                {
                  "trait_id": "facet_self_discipline",
                  "name": "Self-discipline",
                  "category": "personality",
                  "percentile": 0.8566584035650248
                },
                {
                  "trait_id": "facet_self_efficacy",
                  "name": "Self-efficacy",
                  "category": "personality",
                  "percentile": 0.8263948273131865
                }
              ]
            },
            {
              "trait_id": "big5_extraversion",
              "name": "Extraversion",
              "category": "personality",
              "percentile": 0.36874410401787916,
              "children": [
                {
                  "trait_id": "facet_activity_level",
                  "name": "Activity level",
                  "category": "personality",
                  "percentile": 0.9787826802174417
                },
                {
                  "trait_id": "facet_assertiveness",
                  "name": "Assertiveness",
                  "category": "personality",
                  "percentile": 0.9793977330244685
                },
                {
                  "trait_id": "facet_cheerfulness",
                  "name": "Cheerfulness",
                  "category": "personality",
                  "percentile": 0.5
                },
                {
                  "trait_id": "facet_excitement_seeking",
                  "name": "Excitement-seeking",
                  "category": "personality",
                  "percentile": 0.10557267217480637
                },
                {
                  "trait_id": "facet_friendliness",
                  "name": "Outgoing",
                  "category": "personality",
                  "percentile": 0.5
                },
                {
                  "trait_id": "facet_gregariousness",
                  "name": "Gregariousness",
                  "category": "personality",
                  "percentile": 0.02784580961339911
                }
              ]
            },
            {
              "trait_id": "big5_agreeableness",
              "name": "Agreeableness",
              "category": "personality",
              "percentile": 0.98081115015806,
              "children": [
                {
                  "trait_id": "facet_altruism",
                  "name": "Altruism",
                  "category": "personality",
                  "percentile": 0.5
                },
                {
                  "trait_id": "facet_cooperation",
                  "name": "Cooperation",
                  "category": "personality",
                  "percentile": 0.5
                },
                {
                  "trait_id": "facet_modesty",
                  "name": "Modesty",
                  "category": "personality",
                  "percentile": 0.5
                },
                {
                  "trait_id": "facet_morality",
                  "name": "Uncompromising",
                  "category": "personality",
                  "percentile": 0.8464519435006734
                },
                {
                  "trait_id": "facet_sympathy",
                  "name": "Sympathy",
                  "category": "personality",
                  "percentile": 0.966731683954345
                },
                {
                  "trait_id": "facet_trust",
                  "name": "Trust",
                  "category": "personality",
                  "percentile": 0.5
                }
              ]
            },
            {
              "trait_id": "big5_neuroticism",
              "name": "Emotional range",
              "category": "personality",
              "percentile": 0.5,
              "children": [
                {
                  "trait_id": "facet_anger",
                  "name": "Fiery",
                  "category": "personality",
                  "percentile": 0.5
                },
                {
                  "trait_id": "facet_anxiety",
                  "name": "Prone to worry",
                  "category": "personality",
                  "percentile": 0.5
                },
                {
                  "trait_id": "facet_depression",
                  "name": "Melancholy",
                  "category": "personality",
                  "percentile": 0.3670445355599977
                },
                {
                  "trait_id": "facet_immoderation",
                  "name": "Immoderation",
                  "category": "personality",
                  "percentile": 0.5
                },
                {
                  "trait_id": "facet_self_consciousness",
                  "name": "Self-consciousness",
                  "category": "personality",
                  "percentile": 0.5
                },
                {
                  "trait_id": "facet_vulnerability",
                  "name": "Susceptible to stress",
                  "category": "personality",
                  "percentile": 0.3380893416978269
                }
              ]
            }
          ],
          "needs": [
            {
              "trait_id": "need_challenge",
              "name": "Challenge",
              "category": "needs",
              "percentile": 0.17901586557440857
            },
            {
              "trait_id": "need_closeness",
              "name": "Closeness",
              "category": "needs",
              "percentile": 0.587551617327663
            },
            {
              "trait_id": "need_curiosity",
              "name": "Curiosity",
              "category": "needs",
              "percentile": 0.7324252782082346
            },
            {
              "trait_id": "need_excitement",
              "name": "Excitement",
              "category": "needs",
              "percentile": 0.054618063244743054
            },
            {
              "trait_id": "need_harmony",
              "name": "Harmony",
              "category": "needs",
              "percentile": 0.7162122079265901
            },
            {
              "trait_id": "need_ideal",
              "name": "Ideal",
              "category": "needs",
              "percentile": 0.5
            },
            {
              "trait_id": "need_liberty",
              "name": "Liberty",
              "category": "needs",
              "percentile": 0.5
            },
            {
              "trait_id": "need_love",
              "name": "Love",
              "category": "needs",
              "percentile": 0.5
            },
            {
              "trait_id": "need_practicality",
              "name": "Practicality",
              "category": "needs",
              "percentile": 0.5
            },
            {
              "trait_id": "need_self_expression",
              "name": "Self-expression",
              "category": "needs",
              "percentile": 0.4351596082022684
            },
            {
              "trait_id": "need_stability",
              "name": "Stability",
              "category": "needs",
              "percentile": 0.3097565955388345
            },
            {
              "trait_id": "need_structure",
              "name": "Structure",
              "category": "needs",
              "percentile": 0.5
            }
          ],
          "values": [
            {
              "trait_id": "value_conservation",
              "name": "Conservation",
              "category": "values",
              "percentile": 0.1303942089066925
            },
            {
              "trait_id": "value_openness_to_change",
              "name": "Openness to change",
              "category": "values",
              "percentile": 0.857196110774301
            },
            {
              "trait_id": "value_hedonism",
              "name": "Hedonism",
              "category": "values",
              "percentile": 0.02837305950265001
            },
            {
              "trait_id": "value_self_enhancement",
              "name": "Self-enhancement",
              "category": "values",
              "percentile": 0.5
            },
            {
              "trait_id": "value_self_transcendence",
              "name": "Self-transcendence",
              "category": "values",
              "percentile": 0.7922775256246859
            }
          ],
          "behavior": [
            {
              "trait_id": "behavior_sunday",
              "name": "Sunday",
              "category": "behavior",
              "percentage": 0.15084915084915085
            },
            {
              "trait_id": "behavior_monday",
              "name": "Monday",
              "category": "behavior",
              "percentage": 0.06993006993006994
            },
            {
              "trait_id": "behavior_tuesday",
              "name": "Tuesday",
              "category": "behavior",
              "percentage": 0.14485514485514486
            },
            {
              "trait_id": "behavior_wednesday",
              "name": "Wednesday",
              "category": "behavior",
              "percentage": 0.13986013986013987
            },
            {
              "trait_id": "behavior_thursday",
              "name": "Thursday",
              "category": "behavior",
              "percentage": 0.1018981018981019
            },
            {
              "trait_id": "behavior_friday",
              "name": "Friday",
              "category": "behavior",
              "percentage": 0.25574425574425574
            },
            {
              "trait_id": "behavior_saturday",
              "name": "Saturday",
              "category": "behavior",
              "percentage": 0.13686313686313686
            },
            {
              "trait_id": "behavior_0000",
              "name": "0:00 am",
              "category": "behavior",
              "percentage": 0
            },
            {
              "trait_id": "behavior_0100",
              "name": "1:00 am",
              "category": "behavior",
              "percentage": 0
            },
            {
              "trait_id": "behavior_0200",
              "name": "2:00 am",
              "category": "behavior",
              "percentage": 0
            },
            {
              "trait_id": "behavior_0300",
              "name": "3:00 am",
              "category": "behavior",
              "percentage": 0
            },
            {
              "trait_id": "behavior_0400",
              "name": "4:00 am",
              "category": "behavior",
              "percentage": 0
            },
            {
              "trait_id": "behavior_0500",
              "name": "5:00 am",
              "category": "behavior",
              "percentage": 0
            },
            {
              "trait_id": "behavior_0600",
              "name": "6:00 am",
              "category": "behavior",
              "percentage": 0.013986013986013986
            },
            {
              "trait_id": "behavior_0700",
              "name": "7:00 am",
              "category": "behavior",
              "percentage": 0.006993006993006993
            },
            {
              "trait_id": "behavior_0800",
              "name": "8:00 am",
              "category": "behavior",
              "percentage": 0.04195804195804196
            },
            {
              "trait_id": "behavior_0900",
              "name": "9:00 am",
              "category": "behavior",
              "percentage": 0.013986013986013986
            },
            {
              "trait_id": "behavior_1000",
              "name": "10:00 am",
              "category": "behavior",
              "percentage": 0.02097902097902098
            },
            {
              "trait_id": "behavior_1100",
              "name": "11:00 am",
              "category": "behavior",
              "percentage": 0.07692307692307693
            },
            {
              "trait_id": "behavior_1200",
              "name": "12:00 pm",
              "category": "behavior",
              "percentage": 0.060939060939060936
            },
            {
              "trait_id": "behavior_1300",
              "name": "1:00 pm",
              "category": "behavior",
              "percentage": 0.04195804195804196
            },
            {
              "trait_id": "behavior_1400",
              "name": "2:00 pm",
              "category": "behavior",
              "percentage": 0.11788211788211789
            },
            {
              "trait_id": "behavior_1500",
              "name": "3:00 pm",
              "category": "behavior",
              "percentage": 0.1088911088911089
            },
            {
              "trait_id": "behavior_1600",
              "name": "4:00 pm",
              "category": "behavior",
              "percentage": 0.060939060939060936
            },
            {
              "trait_id": "behavior_1700",
              "name": "5:00 pm",
              "category": "behavior",
              "percentage": 0.04095904095904096
            },
            {
              "trait_id": "behavior_1800",
              "name": "6:00 pm",
              "category": "behavior",
              "percentage": 0.07692307692307693
            },
            {
              "trait_id": "behavior_1900",
              "name": "7:00 pm",
              "category": "behavior",
              "percentage": 0.13086913086913088
            },
            {
              "trait_id": "behavior_2000",
              "name": "8:00 pm",
              "category": "behavior",
              "percentage": 0.054945054945054944
            },
            {
              "trait_id": "behavior_2100",
              "name": "9:00 pm",
              "category": "behavior",
              "percentage": 0.07492507492507493
            },
            {
              "trait_id": "behavior_2200",
              "name": "10:00 pm",
              "category": "behavior",
              "percentage": 0.04195804195804196
            },
            {
              "trait_id": "behavior_2300",
              "name": "11:00 pm",
              "category": "behavior",
              "percentage": 0.013986013986013986
            }
          ],
          "consumption_preferences": [
            {
              "consumption_preference_category_id": "consumption_preferences_shopping",
              "name": "Purchasing Preferences",
              "consumption_preferences": [
                {
                  "consumption_preference_id": "consumption_preferences_automobile_ownership_cost",
                  "name": "Likely to be sensitive to ownership cost when buying automobiles",
                  "score": 0
                },
                {
                  "consumption_preference_id": "consumption_preferences_automobile_safety",
                  "name": "Likely to prefer safety when buying automobiles",
                  "score": 1
                },
                {
                  "consumption_preference_id": "consumption_preferences_clothes_quality",
                  "name": "Likely to prefer quality when buying clothes",
                  "score": 0
                },
                {
                  "consumption_preference_id": "consumption_preferences_clothes_style",
                  "name": "Likely to prefer style when buying clothes",
                  "score": 1
                },
                {
                  "consumption_preference_id": "consumption_preferences_clothes_comfort",
                  "name": "Likely to prefer comfort when buying clothes",
                  "score": 1
                },
                {
                  "consumption_preference_id": "consumption_preferences_influence_brand_name",
                  "name": "Likely to be influenced by brand name when making product purchases",
                  "score": 0.5
                },
                {
                  "consumption_preference_id": "consumption_preferences_influence_utility",
                  "name": "Likely to be influenced by product utility when making product purchases",
                  "score": 0
                },
                {
                  "consumption_preference_id": "consumption_preferences_influence_online_ads",
                  "name": "Likely to be influenced by online ads when making product purchases",
                  "score": 1
                },
                {
                  "consumption_preference_id": "consumption_preferences_influence_social_media",
                  "name": "Likely to be influenced by social media when making product purchases",
                  "score": 1
                },
                {
                  "consumption_preference_id": "consumption_preferences_influence_family_members",
                  "name": "Likely to be influenced by family when making product purchases",
                  "score": 1
                },
                {
                  "consumption_preference_id": "consumption_preferences_spur_of_moment",
                  "name": "Likely to indulge in spur of the moment purchases",
                  "score": 0.5
                },
                {
                  "consumption_preference_id": "consumption_preferences_credit_card_payment",
                  "name": "Likely to prefer using credit cards for shopping",
                  "score": 1
                }
              ]
            },
            {
              "consumption_preference_category_id": "consumption_preferences_health_and_activity",
              "name": "Health & Activity Preferences",
              "consumption_preferences": [
                {
                  "consumption_preference_id": "consumption_preferences_eat_out",
                  "name": "Likely to eat out frequently",
                  "score": 0
                },
                {
                  "consumption_preference_id": "consumption_preferences_gym_membership",
                  "name": "Likely to have a gym membership",
                  "score": 0
                },
                {
                  "consumption_preference_id": "consumption_preferences_outdoor",
                  "name": "Likely to like outdoor activities",
                  "score": 0
                }
              ]
            },
            {
              "consumption_preference_category_id": "consumption_preferences_environmental_concern",
              "name": "Environmental Concern Preferences",
              "consumption_preferences": [
                {
                  "consumption_preference_id": "consumption_preferences_concerned_environment",
                  "name": "Likely to be concerned about the environment",
                  "score": 0.5
                }
              ]
            },
            {
              "consumption_preference_category_id": "consumption_preferences_entrepreneurship",
              "name": "Entrepreneurship Preferences",
              "consumption_preferences": [
                {
                  "consumption_preference_id": "consumption_preferences_start_business",
                  "name": "Likely to consider starting a business in next few years",
                  "score": 1
                }
              ]
            },
            {
              "consumption_preference_category_id": "consumption_preferences_movie",
              "name": "Movie Preferences",
              "consumption_preferences": [
                {
                  "consumption_preference_id": "consumption_preferences_movie_romance",
                  "name": "Likely to like romance movies",
                  "score": 1
                },
                {
                  "consumption_preference_id": "consumption_preferences_movie_adventure",
                  "name": "Likely to like adventure movies",
                  "score": 0
                },
                {
                  "consumption_preference_id": "consumption_preferences_movie_horror",
                  "name": "Likely to like horror movies",
                  "score": 1
                },
                {
                  "consumption_preference_id": "consumption_preferences_movie_musical",
                  "name": "Likely to like musical movies",
                  "score": 0
                },
                {
                  "consumption_preference_id": "consumption_preferences_movie_historical",
                  "name": "Likely to like historical movies",
                  "score": 0
                },
                {
                  "consumption_preference_id": "consumption_preferences_movie_science_fiction",
                  "name": "Likely to like science-fiction movies",
                  "score": 0
                },
                {
                  "consumption_preference_id": "consumption_preferences_movie_war",
                  "name": "Likely to like war movies",
                  "score": 0
                },
                {
                  "consumption_preference_id": "consumption_preferences_movie_drama",
                  "name": "Likely to like drama movies",
                  "score": 1
                },
                {
                  "consumption_preference_id": "consumption_preferences_movie_action",
                  "name": "Likely to like action movies",
                  "score": 0
                },
                {
                  "consumption_preference_id": "consumption_preferences_movie_documentary",
                  "name": "Likely to like documentary movies",
                  "score": 0
                }
              ]
            },
            {
              "consumption_preference_category_id": "consumption_preferences_music",
              "name": "Music Preferences",
              "consumption_preferences": [
                {
                  "consumption_preference_id": "consumption_preferences_music_rap",
                  "name": "Likely to like rap music",
                  "score": 0.5
                },
                {
                  "consumption_preference_id": "consumption_preferences_music_country",
                  "name": "Likely to like country music",
                  "score": 1
                },
                {
                  "consumption_preference_id": "consumption_preferences_music_r_b",
                  "name": "Likely to like R&B music",
                  "score": 1
                },
                {
                  "consumption_preference_id": "consumption_preferences_music_hip_hop",
                  "name": "Likely to like hip hop music",
                  "score": 0.5
                },
                {
                  "consumption_preference_id": "consumption_preferences_music_live_event",
                  "name": "Likely to attend live musical events",
                  "score": 0
                },
                {
                  "consumption_preference_id": "consumption_preferences_music_playing",
                  "name": "Likely to have experience playing music",
                  "score": 0
                },
                {
                  "consumption_preference_id": "consumption_preferences_music_latin",
                  "name": "Likely to like Latin music",
                  "score": 1
                },
                {
                  "consumption_preference_id": "consumption_preferences_music_rock",
                  "name": "Likely to like rock music",
                  "score": 0
                },
                {
                  "consumption_preference_id": "consumption_preferences_music_classical",
                  "name": "Likely to like classical music",
                  "score": 0.5
                }
              ]
            },
            {
              "consumption_preference_category_id": "consumption_preferences_reading",
              "name": "Reading Preferences",
              "consumption_preferences": [
                {
                  "consumption_preference_id": "consumption_preferences_read_frequency",
                  "name": "Likely to read often",
                  "score": 0.5
                },
                {
                  "consumption_preference_id": "consumption_preferences_books_entertainment_magazines",
                  "name": "Likely to read entertainment magazines",
                  "score": 1
                },
                {
                  "consumption_preference_id": "consumption_preferences_books_non_fiction",
                  "name": "Likely to read non-fiction books",
                  "score": 0
                },
                {
                  "consumption_preference_id": "consumption_preferences_books_financial_investing",
                  "name": "Likely to read financial investment books",
                  "score": 0
                },
                {
                  "consumption_preference_id": "consumption_preferences_books_autobiographies",
                  "name": "Likely to read autobiographical books",
                  "score": 0
                }
              ]
            },
            {
              "consumption_preference_category_id": "consumption_preferences_volunteering",
              "name": "Volunteering Preferences",
              "consumption_preferences": [
                {
                  "consumption_preference_id": "consumption_preferences_volunteer",
                  "name": "Likely to volunteer for social causes",
                  "score": 1
                }
              ]
            }
          ],
          "warnings": []
        }
    },
    {
        id: "faridyu",
        lang: "ja",
        imagePath: "/images/twitter/faridyu.jpg",
        profile: {
          "word_count": 56698,
          "processed_language": "ja",
          "personality": [
            {
              "trait_id": "big5_openness",
              "name": "Openness",
              "category": "personality",
              "percentile": 0.9966996633964833,
              "children": [
                {
                  "trait_id": "facet_adventurousness",
                  "name": "Adventurousness",
                  "category": "personality",
                  "percentile": 0.9013405857178858
                },
                {
                  "trait_id": "facet_artistic_interests",
                  "name": "Artistic interests",
                  "category": "personality",
                  "percentile": 0.6288665899816054
                },
                {
                  "trait_id": "facet_emotionality",
                  "name": "Emotionality",
                  "category": "personality",
                  "percentile": 0.4798669015383319
                },
                {
                  "trait_id": "facet_imagination",
                  "name": "Imagination",
                  "category": "personality",
                  "percentile": 0.8017686266157893
                },
                {
                  "trait_id": "facet_intellect",
                  "name": "Intellect",
                  "category": "personality",
                  "percentile": 0.935013916542565
                },
                {
                  "trait_id": "facet_liberalism",
                  "name": "Authority-challenging",
                  "category": "personality",
                  "percentile": 0.9997778422308049
                }
              ]
            },
            {
              "trait_id": "big5_conscientiousness",
              "name": "Conscientiousness",
              "category": "personality",
              "percentile": 0.79928491750717,
              "children": [
                {
                  "trait_id": "facet_achievement_striving",
                  "name": "Achievement striving",
                  "category": "personality",
                  "percentile": 0.9908793303994337
                },
                {
                  "trait_id": "facet_cautiousness",
                  "name": "Cautiousness",
                  "category": "personality",
                  "percentile": 0.11418829482746118
                },
                {
                  "trait_id": "facet_dutifulness",
                  "name": "Dutifulness",
                  "category": "personality",
                  "percentile": 0.9654552767843768
                },
                {
                  "trait_id": "facet_orderliness",
                  "name": "Orderliness",
                  "category": "personality",
                  "percentile": 0.9270119441277715
                },
                {
                  "trait_id": "facet_self_discipline",
                  "name": "Self-discipline",
                  "category": "personality",
                  "percentile": 0.9999985377357488
                },
                {
                  "trait_id": "facet_self_efficacy",
                  "name": "Self-efficacy",
                  "category": "personality",
                  "percentile": 0.9989597992083652
                }
              ]
            },
            {
              "trait_id": "big5_extraversion",
              "name": "Extraversion",
              "category": "personality",
              "percentile": 0.8663078336294698,
              "children": [
                {
                  "trait_id": "facet_activity_level",
                  "name": "Activity level",
                  "category": "personality",
                  "percentile": 0.9804447323784395
                },
                {
                  "trait_id": "facet_assertiveness",
                  "name": "Assertiveness",
                  "category": "personality",
                  "percentile": 0.8698866228415196
                },
                {
                  "trait_id": "facet_cheerfulness",
                  "name": "Cheerfulness",
                  "category": "personality",
                  "percentile": 0.9999656170930411
                },
                {
                  "trait_id": "facet_excitement_seeking",
                  "name": "Excitement-seeking",
                  "category": "personality",
                  "percentile": 0.719671137646616
                },
                {
                  "trait_id": "facet_friendliness",
                  "name": "Outgoing",
                  "category": "personality",
                  "percentile": 0.9973268928316792
                },
                {
                  "trait_id": "facet_gregariousness",
                  "name": "Gregariousness",
                  "category": "personality",
                  "percentile": 0.13941138897796307
                }
              ]
            },
            {
              "trait_id": "big5_agreeableness",
              "name": "Agreeableness",
              "category": "personality",
              "percentile": 0.7232723369552655,
              "children": [
                {
                  "trait_id": "facet_altruism",
                  "name": "Altruism",
                  "category": "personality",
                  "percentile": 0.9750736370270043
                },
                {
                  "trait_id": "facet_cooperation",
                  "name": "Cooperation",
                  "category": "personality",
                  "percentile": 0.9262460147823781
                },
                {
                  "trait_id": "facet_modesty",
                  "name": "Modesty",
                  "category": "personality",
                  "percentile": 0.03563911358518024
                },
                {
                  "trait_id": "facet_morality",
                  "name": "Uncompromising",
                  "category": "personality",
                  "percentile": 0.972267236476509
                },
                {
                  "trait_id": "facet_sympathy",
                  "name": "Sympathy",
                  "category": "personality",
                  "percentile": 0.9943275851605067
                },
                {
                  "trait_id": "facet_trust",
                  "name": "Trust",
                  "category": "personality",
                  "percentile": 0.988914996854482
                }
              ]
            },
            {
              "trait_id": "big5_neuroticism",
              "name": "Emotional range",
              "category": "personality",
              "percentile": 0.17726844511401302,
              "children": [
                {
                  "trait_id": "facet_anger",
                  "name": "Fiery",
                  "category": "personality",
                  "percentile": 0.03657363685062559
                },
                {
                  "trait_id": "facet_anxiety",
                  "name": "Prone to worry",
                  "category": "personality",
                  "percentile": 0.012056827535942893
                },
                {
                  "trait_id": "facet_depression",
                  "name": "Melancholy",
                  "category": "personality",
                  "percentile": 0.0003900981151319649
                },
                {
                  "trait_id": "facet_immoderation",
                  "name": "Immoderation",
                  "category": "personality",
                  "percentile": 0.04707939595189614
                },
                {
                  "trait_id": "facet_self_consciousness",
                  "name": "Self-consciousness",
                  "category": "personality",
                  "percentile": 0.00016265160244222088
                },
                {
                  "trait_id": "facet_vulnerability",
                  "name": "Susceptible to stress",
                  "category": "personality",
                  "percentile": 0.0014496648792959865
                }
              ]
            }
          ],
          "needs": [
            {
              "trait_id": "need_challenge",
              "name": "Challenge",
              "category": "needs",
              "percentile": 0.16055172722562705
            },
            {
              "trait_id": "need_closeness",
              "name": "Closeness",
              "category": "needs",
              "percentile": 0.27863900543264464
            },
            {
              "trait_id": "need_curiosity",
              "name": "Curiosity",
              "category": "needs",
              "percentile": 0.7695318905378763
            },
            {
              "trait_id": "need_excitement",
              "name": "Excitement",
              "category": "needs",
              "percentile": 0.4951309241266905
            },
            {
              "trait_id": "need_harmony",
              "name": "Harmony",
              "category": "needs",
              "percentile": 0.00036024492985192724
            },
            {
              "trait_id": "need_ideal",
              "name": "Ideal",
              "category": "needs",
              "percentile": 0.7433137708642374
            },
            {
              "trait_id": "need_liberty",
              "name": "Liberty",
              "category": "needs",
              "percentile": 0.5059466136938767
            },
            {
              "trait_id": "need_love",
              "name": "Love",
              "category": "needs",
              "percentile": 0.17264291806106996
            },
            {
              "trait_id": "need_practicality",
              "name": "Practicality",
              "category": "needs",
              "percentile": 0.08181683812131063
            },
            {
              "trait_id": "need_self_expression",
              "name": "Self-expression",
              "category": "needs",
              "percentile": 0.12955257411984106
            },
            {
              "trait_id": "need_stability",
              "name": "Stability",
              "category": "needs",
              "percentile": 0.6705547824935054
            },
            {
              "trait_id": "need_structure",
              "name": "Structure",
              "category": "needs",
              "percentile": 0.3633169522313261
            }
          ],
          "values": [
            {
              "trait_id": "value_conservation",
              "name": "Conservation",
              "category": "values",
              "percentile": 0.119670037502774
            },
            {
              "trait_id": "value_openness_to_change",
              "name": "Openness to change",
              "category": "values",
              "percentile": 0.9629397965854339
            },
            {
              "trait_id": "value_hedonism",
              "name": "Hedonism",
              "category": "values",
              "percentile": 0.03349858461048805
            },
            {
              "trait_id": "value_self_enhancement",
              "name": "Self-enhancement",
              "category": "values",
              "percentile": 0.19418868883757812
            },
            {
              "trait_id": "value_self_transcendence",
              "name": "Self-transcendence",
              "category": "values",
              "percentile": 0.37505183002908193
            }
          ],
          "behavior": [
            {
              "trait_id": "behavior_sunday",
              "name": "Sunday",
              "category": "behavior",
              "percentage": 0.1019266625233064
            },
            {
              "trait_id": "behavior_monday",
              "name": "Monday",
              "category": "behavior",
              "percentage": 0.13362336855189558
            },
            {
              "trait_id": "behavior_tuesday",
              "name": "Tuesday",
              "category": "behavior",
              "percentage": 0.06401491609695463
            },
            {
              "trait_id": "behavior_wednesday",
              "name": "Wednesday",
              "category": "behavior",
              "percentage": 0.11746426351771287
            },
            {
              "trait_id": "behavior_thursday",
              "name": "Thursday",
              "category": "behavior",
              "percentage": 0.15786202610316968
            },
            {
              "trait_id": "behavior_friday",
              "name": "Friday",
              "category": "behavior",
              "percentage": 0.23368551895587322
            },
            {
              "trait_id": "behavior_saturday",
              "name": "Saturday",
              "category": "behavior",
              "percentage": 0.19142324425108764
            },
            {
              "trait_id": "behavior_0000",
              "name": "0:00 am",
              "category": "behavior",
              "percentage": 0.08079552517091361
            },
            {
              "trait_id": "behavior_0100",
              "name": "1:00 am",
              "category": "behavior",
              "percentage": 0.06401491609695463
            },
            {
              "trait_id": "behavior_0200",
              "name": "2:00 am",
              "category": "behavior",
              "percentage": 0.023617153511497825
            },
            {
              "trait_id": "behavior_0300",
              "name": "3:00 am",
              "category": "behavior",
              "percentage": 0.06339341205717837
            },
            {
              "trait_id": "behavior_0400",
              "name": "4:00 am",
              "category": "behavior",
              "percentage": 0.11622125543816035
            },
            {
              "trait_id": "behavior_0500",
              "name": "5:00 am",
              "category": "behavior",
              "percentage": 0.024238657551274082
            },
            {
              "trait_id": "behavior_0600",
              "name": "6:00 am",
              "category": "behavior",
              "percentage": 0.02983219390926041
            },
            {
              "trait_id": "behavior_0700",
              "name": "7:00 am",
              "category": "behavior",
              "percentage": 0.014916096954630205
            },
            {
              "trait_id": "behavior_0800",
              "name": "8:00 am",
              "category": "behavior",
              "percentage": 0
            },
            {
              "trait_id": "behavior_0900",
              "name": "9:00 am",
              "category": "behavior",
              "percentage": 0.0074580484773151025
            },
            {
              "trait_id": "behavior_1000",
              "name": "10:00 am",
              "category": "behavior",
              "percentage": 0
            },
            {
              "trait_id": "behavior_1100",
              "name": "11:00 am",
              "category": "behavior",
              "percentage": 0.044748290863890615
            },
            {
              "trait_id": "behavior_1200",
              "name": "12:00 pm",
              "category": "behavior",
              "percentage": 0.0074580484773151025
            },
            {
              "trait_id": "behavior_1300",
              "name": "1:00 pm",
              "category": "behavior",
              "percentage": 0.02983219390926041
            },
            {
              "trait_id": "behavior_1400",
              "name": "2:00 pm",
              "category": "behavior",
              "percentage": 0
            },
            {
              "trait_id": "behavior_1500",
              "name": "3:00 pm",
              "category": "behavior",
              "percentage": 0.14108141702921068
            },
            {
              "trait_id": "behavior_1600",
              "name": "4:00 pm",
              "category": "behavior",
              "percentage": 0.07085146053449347
            },
            {
              "trait_id": "behavior_1700",
              "name": "5:00 pm",
              "category": "behavior",
              "percentage": 0.04785581106277191
            },
            {
              "trait_id": "behavior_1800",
              "name": "6:00 pm",
              "category": "behavior",
              "percentage": 0.024238657551274082
            },
            {
              "trait_id": "behavior_1900",
              "name": "7:00 pm",
              "category": "behavior",
              "percentage": 0.048477315102548164
            },
            {
              "trait_id": "behavior_2000",
              "name": "8:00 pm",
              "category": "behavior",
              "percentage": 0.040397762585456805
            },
            {
              "trait_id": "behavior_2100",
              "name": "9:00 pm",
              "category": "behavior",
              "percentage": 0.024238657551274082
            },
            {
              "trait_id": "behavior_2200",
              "name": "10:00 pm",
              "category": "behavior",
              "percentage": 0.024238657551274082
            },
            {
              "trait_id": "behavior_2300",
              "name": "11:00 pm",
              "category": "behavior",
              "percentage": 0.07209446861404599
            }
          ],
          "consumption_preferences": [
            {
              "consumption_preference_category_id": "consumption_preferences_shopping",
              "name": "Purchasing Preferences",
              "consumption_preferences": [
                {
                  "consumption_preference_id": "consumption_preferences_automobile_ownership_cost",
                  "name": "Likely to be sensitive to ownership cost when buying automobiles",
                  "score": 1
                },
                {
                  "consumption_preference_id": "consumption_preferences_automobile_safety",
                  "name": "Likely to prefer safety when buying automobiles",
                  "score": 1
                },
                {
                  "consumption_preference_id": "consumption_preferences_clothes_quality",
                  "name": "Likely to prefer quality when buying clothes",
                  "score": 1
                },
                {
                  "consumption_preference_id": "consumption_preferences_clothes_style",
                  "name": "Likely to prefer style when buying clothes",
                  "score": 1
                },
                {
                  "consumption_preference_id": "consumption_preferences_clothes_comfort",
                  "name": "Likely to prefer comfort when buying clothes",
                  "score": 0
                },
                {
                  "consumption_preference_id": "consumption_preferences_influence_brand_name",
                  "name": "Likely to be influenced by brand name when making product purchases",
                  "score": 0.5
                },
                {
                  "consumption_preference_id": "consumption_preferences_influence_utility",
                  "name": "Likely to be influenced by product utility when making product purchases",
                  "score": 0
                },
                {
                  "consumption_preference_id": "consumption_preferences_influence_online_ads",
                  "name": "Likely to be influenced by online ads when making product purchases",
                  "score": 1
                },
                {
                  "consumption_preference_id": "consumption_preferences_influence_social_media",
                  "name": "Likely to be influenced by social media when making product purchases",
                  "score": 1
                },
                {
                  "consumption_preference_id": "consumption_preferences_influence_family_members",
                  "name": "Likely to be influenced by family when making product purchases",
                  "score": 1
                },
                {
                  "consumption_preference_id": "consumption_preferences_spur_of_moment",
                  "name": "Likely to indulge in spur of the moment purchases",
                  "score": 0.5
                },
                {
                  "consumption_preference_id": "consumption_preferences_credit_card_payment",
                  "name": "Likely to prefer using credit cards for shopping",
                  "score": 1
                }
              ]
            },
            {
              "consumption_preference_category_id": "consumption_preferences_health_and_activity",
              "name": "Health & Activity Preferences",
              "consumption_preferences": [
                {
                  "consumption_preference_id": "consumption_preferences_eat_out",
                  "name": "Likely to eat out frequently",
                  "score": 0
                },
                {
                  "consumption_preference_id": "consumption_preferences_gym_membership",
                  "name": "Likely to have a gym membership",
                  "score": 0
                },
                {
                  "consumption_preference_id": "consumption_preferences_outdoor",
                  "name": "Likely to like outdoor activities",
                  "score": 0.5
                }
              ]
            },
            {
              "consumption_preference_category_id": "consumption_preferences_environmental_concern",
              "name": "Environmental Concern Preferences",
              "consumption_preferences": [
                {
                  "consumption_preference_id": "consumption_preferences_concerned_environment",
                  "name": "Likely to be concerned about the environment",
                  "score": 1
                }
              ]
            },
            {
              "consumption_preference_category_id": "consumption_preferences_entrepreneurship",
              "name": "Entrepreneurship Preferences",
              "consumption_preferences": [
                {
                  "consumption_preference_id": "consumption_preferences_start_business",
                  "name": "Likely to consider starting a business in next few years",
                  "score": 1
                }
              ]
            },
            {
              "consumption_preference_category_id": "consumption_preferences_movie",
              "name": "Movie Preferences",
              "consumption_preferences": [
                {
                  "consumption_preference_id": "consumption_preferences_movie_romance",
                  "name": "Likely to like romance movies",
                  "score": 0
                },
                {
                  "consumption_preference_id": "consumption_preferences_movie_adventure",
                  "name": "Likely to like adventure movies",
                  "score": 0
                },
                {
                  "consumption_preference_id": "consumption_preferences_movie_horror",
                  "name": "Likely to like horror movies",
                  "score": 0
                },
                {
                  "consumption_preference_id": "consumption_preferences_movie_musical",
                  "name": "Likely to like musical movies",
                  "score": 0
                },
                {
                  "consumption_preference_id": "consumption_preferences_movie_historical",
                  "name": "Likely to like historical movies",
                  "score": 0
                },
                {
                  "consumption_preference_id": "consumption_preferences_movie_science_fiction",
                  "name": "Likely to like science-fiction movies",
                  "score": 0
                },
                {
                  "consumption_preference_id": "consumption_preferences_movie_war",
                  "name": "Likely to like war movies",
                  "score": 0
                },
                {
                  "consumption_preference_id": "consumption_preferences_movie_drama",
                  "name": "Likely to like drama movies",
                  "score": 1
                },
                {
                  "consumption_preference_id": "consumption_preferences_movie_action",
                  "name": "Likely to like action movies",
                  "score": 0
                },
                {
                  "consumption_preference_id": "consumption_preferences_movie_documentary",
                  "name": "Likely to like documentary movies",
                  "score": 1
                }
              ]
            },
            {
              "consumption_preference_category_id": "consumption_preferences_music",
              "name": "Music Preferences",
              "consumption_preferences": [
                {
                  "consumption_preference_id": "consumption_preferences_music_rap",
                  "name": "Likely to like rap music",
                  "score": 1
                },
                {
                  "consumption_preference_id": "consumption_preferences_music_country",
                  "name": "Likely to like country music",
                  "score": 0.5
                },
                {
                  "consumption_preference_id": "consumption_preferences_music_r_b",
                  "name": "Likely to like R&B music",
                  "score": 1
                },
                {
                  "consumption_preference_id": "consumption_preferences_music_hip_hop",
                  "name": "Likely to like hip hop music",
                  "score": 1
                },
                {
                  "consumption_preference_id": "consumption_preferences_music_live_event",
                  "name": "Likely to attend live musical events",
                  "score": 1
                },
                {
                  "consumption_preference_id": "consumption_preferences_music_playing",
                  "name": "Likely to have experience playing music",
                  "score": 0
                },
                {
                  "consumption_preference_id": "consumption_preferences_music_latin",
                  "name": "Likely to like Latin music",
                  "score": 1
                },
                {
                  "consumption_preference_id": "consumption_preferences_music_rock",
                  "name": "Likely to like rock music",
                  "score": 0
                },
                {
                  "consumption_preference_id": "consumption_preferences_music_classical",
                  "name": "Likely to like classical music",
                  "score": 1
                }
              ]
            },
            {
              "consumption_preference_category_id": "consumption_preferences_reading",
              "name": "Reading Preferences",
              "consumption_preferences": [
                {
                  "consumption_preference_id": "consumption_preferences_read_frequency",
                  "name": "Likely to read often",
                  "score": 0.5
                },
                {
                  "consumption_preference_id": "consumption_preferences_books_entertainment_magazines",
                  "name": "Likely to read entertainment magazines",
                  "score": 0
                },
                {
                  "consumption_preference_id": "consumption_preferences_books_non_fiction",
                  "name": "Likely to read non-fiction books",
                  "score": 1
                },
                {
                  "consumption_preference_id": "consumption_preferences_books_financial_investing",
                  "name": "Likely to read financial investment books",
                  "score": 0
                },
                {
                  "consumption_preference_id": "consumption_preferences_books_autobiographies",
                  "name": "Likely to read autobiographical books",
                  "score": 0
                }
              ]
            },
            {
              "consumption_preference_category_id": "consumption_preferences_volunteering",
              "name": "Volunteering Preferences",
              "consumption_preferences": [
                {
                  "consumption_preference_id": "consumption_preferences_volunteer",
                  "name": "Likely to volunteer for social causes",
                  "score": 1
                }
              ]
            }
          ],
          "warnings": [
            {
              "warning_id": "CONTENT_TRUNCATED",
              "message": "For maximum accuracy while also optimizing processing time, only the first 250KB of input text (excluding markup) was analyzed. Accuracy levels off at approximately 3,000 words so this did not affect the accuracy of the profile."
            }
          ]
        }
    },
    {
        id: "Krungy21",
        lang: "ko",
        imagePath: "/images/twitter/Krungy21.jpg",
        profile: {
          "word_count": 14581,
          "processed_language": "ko",
          "personality": [
            {
              "trait_id": "big5_openness",
              "name": "Openness",
              "category": "personality",
              "percentile": 0.530086813761111,
              "children": [
                {
                  "trait_id": "facet_adventurousness",
                  "name": "Adventurousness",
                  "category": "personality",
                  "percentile": 0.8931060549196488
                },
                {
                  "trait_id": "facet_artistic_interests",
                  "name": "Artistic interests",
                  "category": "personality",
                  "percentile": 0.6105514948347511
                },
                {
                  "trait_id": "facet_emotionality",
                  "name": "Emotionality",
                  "category": "personality",
                  "percentile": 0.7922774585993877
                },
                {
                  "trait_id": "facet_imagination",
                  "name": "Imagination",
                  "category": "personality",
                  "percentile": 0.43584730990133536
                },
                {
                  "trait_id": "facet_intellect",
                  "name": "Intellect",
                  "category": "personality",
                  "percentile": 0.10600727320700815
                },
                {
                  "trait_id": "facet_liberalism",
                  "name": "Authority-challenging",
                  "category": "personality",
                  "percentile": 0.286260358178738
                }
              ]
            },
            {
              "trait_id": "big5_conscientiousness",
              "name": "Conscientiousness",
              "category": "personality",
              "percentile": 0.9553289722351597,
              "children": [
                {
                  "trait_id": "facet_achievement_striving",
                  "name": "Achievement striving",
                  "category": "personality",
                  "percentile": 0.9429038181420588
                },
                {
                  "trait_id": "facet_cautiousness",
                  "name": "Cautiousness",
                  "category": "personality",
                  "percentile": 0.9053047760607527
                },
                {
                  "trait_id": "facet_dutifulness",
                  "name": "Dutifulness",
                  "category": "personality",
                  "percentile": 0.9392619137756578
                },
                {
                  "trait_id": "facet_orderliness",
                  "name": "Orderliness",
                  "category": "personality",
                  "percentile": 0.9212690474234502
                },
                {
                  "trait_id": "facet_self_discipline",
                  "name": "Self-discipline",
                  "category": "personality",
                  "percentile": 0.9493520053196292
                },
                {
                  "trait_id": "facet_self_efficacy",
                  "name": "Self-efficacy",
                  "category": "personality",
                  "percentile": 0.8918256170539017
                }
              ]
            },
            {
              "trait_id": "big5_extraversion",
              "name": "Extraversion",
              "category": "personality",
              "percentile": 0.9677189139895053,
              "children": [
                {
                  "trait_id": "facet_activity_level",
                  "name": "Activity level",
                  "category": "personality",
                  "percentile": 0.7590642159703695
                },
                {
                  "trait_id": "facet_assertiveness",
                  "name": "Assertiveness",
                  "category": "personality",
                  "percentile": 0.9663725928403344
                },
                {
                  "trait_id": "facet_cheerfulness",
                  "name": "Cheerfulness",
                  "category": "personality",
                  "percentile": 0.982560082111247
                },
                {
                  "trait_id": "facet_excitement_seeking",
                  "name": "Excitement-seeking",
                  "category": "personality",
                  "percentile": 0.5
                },
                {
                  "trait_id": "facet_friendliness",
                  "name": "Outgoing",
                  "category": "personality",
                  "percentile": 0.971646885892856
                },
                {
                  "trait_id": "facet_gregariousness",
                  "name": "Gregariousness",
                  "category": "personality",
                  "percentile": 0.9481774570184526
                }
              ]
            },
            {
              "trait_id": "big5_agreeableness",
              "name": "Agreeableness",
              "category": "personality",
              "percentile": 0.7696473812713664,
              "children": [
                {
                  "trait_id": "facet_altruism",
                  "name": "Altruism",
                  "category": "personality",
                  "percentile": 0.9224057347922524
                },
                {
                  "trait_id": "facet_cooperation",
                  "name": "Cooperation",
                  "category": "personality",
                  "percentile": 0.7921877495703218
                },
                {
                  "trait_id": "facet_modesty",
                  "name": "Modesty",
                  "category": "personality",
                  "percentile": 0.11690112490990395
                },
                {
                  "trait_id": "facet_morality",
                  "name": "Uncompromising",
                  "category": "personality",
                  "percentile": 0.680821794367931
                },
                {
                  "trait_id": "facet_sympathy",
                  "name": "Sympathy",
                  "category": "personality",
                  "percentile": 0.8617868168966534
                },
                {
                  "trait_id": "facet_trust",
                  "name": "Trust",
                  "category": "personality",
                  "percentile": 0.6911376997602738
                }
              ]
            },
            {
              "trait_id": "big5_neuroticism",
              "name": "Emotional range",
              "category": "personality",
              "percentile": 0.5647989339306938,
              "children": [
                {
                  "trait_id": "facet_anger",
                  "name": "Fiery",
                  "category": "personality",
                  "percentile": 0.46673695230408163
                },
                {
                  "trait_id": "facet_anxiety",
                  "name": "Prone to worry",
                  "category": "personality",
                  "percentile": 0.24112885537329642
                },
                {
                  "trait_id": "facet_depression",
                  "name": "Melancholy",
                  "category": "personality",
                  "percentile": 0.10549018212991762
                },
                {
                  "trait_id": "facet_immoderation",
                  "name": "Immoderation",
                  "category": "personality",
                  "percentile": 0.9030998428715624
                },
                {
                  "trait_id": "facet_self_consciousness",
                  "name": "Self-consciousness",
                  "category": "personality",
                  "percentile": 0.06270489432886622
                },
                {
                  "trait_id": "facet_vulnerability",
                  "name": "Susceptible to stress",
                  "category": "personality",
                  "percentile": 0.2796743201539353
                }
              ]
            }
          ],
          "needs": [
            {
              "trait_id": "need_challenge",
              "name": "Challenge",
              "category": "needs",
              "percentile": 0.6531327845214338
            },
            {
              "trait_id": "need_closeness",
              "name": "Closeness",
              "category": "needs",
              "percentile": 0.7651078981627474
            },
            {
              "trait_id": "need_curiosity",
              "name": "Curiosity",
              "category": "needs",
              "percentile": 0.41085377280781016
            },
            {
              "trait_id": "need_excitement",
              "name": "Excitement",
              "category": "needs",
              "percentile": 0.8007599309734382
            },
            {
              "trait_id": "need_harmony",
              "name": "Harmony",
              "category": "needs",
              "percentile": 0.34952457410464144
            },
            {
              "trait_id": "need_ideal",
              "name": "Ideal",
              "category": "needs",
              "percentile": 0.22360149553487435
            },
            {
              "trait_id": "need_liberty",
              "name": "Liberty",
              "category": "needs",
              "percentile": 0.5
            },
            {
              "trait_id": "need_love",
              "name": "Love",
              "category": "needs",
              "percentile": 0.7474816146215313
            },
            {
              "trait_id": "need_practicality",
              "name": "Practicality",
              "category": "needs",
              "percentile": 0.3147986201664026
            },
            {
              "trait_id": "need_self_expression",
              "name": "Self-expression",
              "category": "needs",
              "percentile": 0.44014400953072114
            },
            {
              "trait_id": "need_stability",
              "name": "Stability",
              "category": "needs",
              "percentile": 0.5
            },
            {
              "trait_id": "need_structure",
              "name": "Structure",
              "category": "needs",
              "percentile": 0.2674646070642859
            }
          ],
          "values": [
            {
              "trait_id": "value_conservation",
              "name": "Conservation",
              "category": "values",
              "percentile": 0.5
            },
            {
              "trait_id": "value_openness_to_change",
              "name": "Openness to change",
              "category": "values",
              "percentile": 0.7092389296691513
            },
            {
              "trait_id": "value_hedonism",
              "name": "Hedonism",
              "category": "values",
              "percentile": 0.6115942903780126
            },
            {
              "trait_id": "value_self_enhancement",
              "name": "Self-enhancement",
              "category": "values",
              "percentile": 0.6280874687283109
            },
            {
              "trait_id": "value_self_transcendence",
              "name": "Self-transcendence",
              "category": "values",
              "percentile": 0.7540385419997166
            }
          ],
          "behavior": [
            {
              "trait_id": "behavior_sunday",
              "name": "Sunday",
              "category": "behavior",
              "percentage": 0.12990527740189445
            },
            {
              "trait_id": "behavior_monday",
              "name": "Monday",
              "category": "behavior",
              "percentage": 0.12494361750112765
            },
            {
              "trait_id": "behavior_tuesday",
              "name": "Tuesday",
              "category": "behavior",
              "percentage": 0.15471357690572846
            },
            {
              "trait_id": "behavior_wednesday",
              "name": "Wednesday",
              "category": "behavior",
              "percentage": 0.14388813712223725
            },
            {
              "trait_id": "behavior_thursday",
              "name": "Thursday",
              "category": "behavior",
              "percentage": 0.14479025710419485
            },
            {
              "trait_id": "behavior_friday",
              "name": "Friday",
              "category": "behavior",
              "percentage": 0.14524131709517366
            },
            {
              "trait_id": "behavior_saturday",
              "name": "Saturday",
              "category": "behavior",
              "percentage": 0.15651781686964367
            },
            {
              "trait_id": "behavior_0000",
              "name": "0:00 am",
              "category": "behavior",
              "percentage": 0.02751465944970681
            },
            {
              "trait_id": "behavior_0100",
              "name": "1:00 am",
              "category": "behavior",
              "percentage": 0.026612539467749212
            },
            {
              "trait_id": "behavior_0200",
              "name": "2:00 am",
              "category": "behavior",
              "percentage": 0.04645917907081642
            },
            {
              "trait_id": "behavior_0300",
              "name": "3:00 am",
              "category": "behavior",
              "percentage": 0.04736129905277402
            },
            {
              "trait_id": "behavior_0400",
              "name": "4:00 am",
              "category": "behavior",
              "percentage": 0.05502931889941362
            },
            {
              "trait_id": "behavior_0500",
              "name": "5:00 am",
              "category": "behavior",
              "percentage": 0.06991429860171403
            },
            {
              "trait_id": "behavior_0600",
              "name": "6:00 am",
              "category": "behavior",
              "percentage": 0.058186738836265225
            },
            {
              "trait_id": "behavior_0700",
              "name": "7:00 am",
              "category": "behavior",
              "percentage": 0.04420387911592242
            },
            {
              "trait_id": "behavior_0800",
              "name": "8:00 am",
              "category": "behavior",
              "percentage": 0.04781235904375282
            },
            {
              "trait_id": "behavior_0900",
              "name": "9:00 am",
              "category": "behavior",
              "percentage": 0.05502931889941362
            },
            {
              "trait_id": "behavior_1000",
              "name": "10:00 am",
              "category": "behavior",
              "percentage": 0.06450157870996842
            },
            {
              "trait_id": "behavior_1100",
              "name": "11:00 am",
              "category": "behavior",
              "percentage": 0.06089309878213803
            },
            {
              "trait_id": "behavior_1200",
              "name": "12:00 pm",
              "category": "behavior",
              "percentage": 0.06089309878213803
            },
            {
              "trait_id": "behavior_1300",
              "name": "1:00 pm",
              "category": "behavior",
              "percentage": 0.06089309878213803
            },
            {
              "trait_id": "behavior_1400",
              "name": "2:00 pm",
              "category": "behavior",
              "percentage": 0.06359945872801083
            },
            {
              "trait_id": "behavior_1500",
              "name": "3:00 pm",
              "category": "behavior",
              "percentage": 0.07668019846639602
            },
            {
              "trait_id": "behavior_1600",
              "name": "4:00 pm",
              "category": "behavior",
              "percentage": 0.042399639152007215
            },
            {
              "trait_id": "behavior_1700",
              "name": "5:00 pm",
              "category": "behavior",
              "percentage": 0.02210193955796121
            },
            {
              "trait_id": "behavior_1800",
              "name": "6:00 pm",
              "category": "behavior",
              "percentage": 0.009021199819576003
            },
            {
              "trait_id": "behavior_1900",
              "name": "7:00 pm",
              "category": "behavior",
              "percentage": 0.011727559765448805
            },
            {
              "trait_id": "behavior_2000",
              "name": "8:00 pm",
              "category": "behavior",
              "percentage": 0.010374379792512404
            },
            {
              "trait_id": "behavior_2100",
              "name": "9:00 pm",
              "category": "behavior",
              "percentage": 0.008570139828597204
            },
            {
              "trait_id": "behavior_2200",
              "name": "10:00 pm",
              "category": "behavior",
              "percentage": 0.013531799729364006
            },
            {
              "trait_id": "behavior_2300",
              "name": "11:00 pm",
              "category": "behavior",
              "percentage": 0.016689219666215605
            }
          ],
          "consumption_preferences": [
            {
              "consumption_preference_category_id": "consumption_preferences_shopping",
              "name": "Purchasing Preferences",
              "consumption_preferences": [
                {
                  "consumption_preference_id": "consumption_preferences_automobile_ownership_cost",
                  "name": "Likely to be sensitive to ownership cost when buying automobiles",
                  "score": 0
                },
                {
                  "consumption_preference_id": "consumption_preferences_automobile_safety",
                  "name": "Likely to prefer safety when buying automobiles",
                  "score": 0.5
                },
                {
                  "consumption_preference_id": "consumption_preferences_clothes_quality",
                  "name": "Likely to prefer quality when buying clothes",
                  "score": 0
                },
                {
                  "consumption_preference_id": "consumption_preferences_clothes_style",
                  "name": "Likely to prefer style when buying clothes",
                  "score": 1
                },
                {
                  "consumption_preference_id": "consumption_preferences_clothes_comfort",
                  "name": "Likely to prefer comfort when buying clothes",
                  "score": 0
                },
                {
                  "consumption_preference_id": "consumption_preferences_influence_brand_name",
                  "name": "Likely to be influenced by brand name when making product purchases",
                  "score": 1
                },
                {
                  "consumption_preference_id": "consumption_preferences_influence_utility",
                  "name": "Likely to be influenced by product utility when making product purchases",
                  "score": 0
                },
                {
                  "consumption_preference_id": "consumption_preferences_influence_online_ads",
                  "name": "Likely to be influenced by online ads when making product purchases",
                  "score": 1
                },
                {
                  "consumption_preference_id": "consumption_preferences_influence_social_media",
                  "name": "Likely to be influenced by social media when making product purchases",
                  "score": 1
                },
                {
                  "consumption_preference_id": "consumption_preferences_influence_family_members",
                  "name": "Likely to be influenced by family when making product purchases",
                  "score": 1
                },
                {
                  "consumption_preference_id": "consumption_preferences_spur_of_moment",
                  "name": "Likely to indulge in spur of the moment purchases",
                  "score": 1
                },
                {
                  "consumption_preference_id": "consumption_preferences_credit_card_payment",
                  "name": "Likely to prefer using credit cards for shopping",
                  "score": 1
                }
              ]
            },
            {
              "consumption_preference_category_id": "consumption_preferences_health_and_activity",
              "name": "Health & Activity Preferences",
              "consumption_preferences": [
                {
                  "consumption_preference_id": "consumption_preferences_eat_out",
                  "name": "Likely to eat out frequently",
                  "score": 1
                },
                {
                  "consumption_preference_id": "consumption_preferences_gym_membership",
                  "name": "Likely to have a gym membership",
                  "score": 1
                },
                {
                  "consumption_preference_id": "consumption_preferences_outdoor",
                  "name": "Likely to like outdoor activities",
                  "score": 1
                }
              ]
            },
            {
              "consumption_preference_category_id": "consumption_preferences_environmental_concern",
              "name": "Environmental Concern Preferences",
              "consumption_preferences": [
                {
                  "consumption_preference_id": "consumption_preferences_concerned_environment",
                  "name": "Likely to be concerned about the environment",
                  "score": 0
                }
              ]
            },
            {
              "consumption_preference_category_id": "consumption_preferences_entrepreneurship",
              "name": "Entrepreneurship Preferences",
              "consumption_preferences": [
                {
                  "consumption_preference_id": "consumption_preferences_start_business",
                  "name": "Likely to consider starting a business in next few years",
                  "score": 1
                }
              ]
            },
            {
              "consumption_preference_category_id": "consumption_preferences_movie",
              "name": "Movie Preferences",
              "consumption_preferences": [
                {
                  "consumption_preference_id": "consumption_preferences_movie_romance",
                  "name": "Likely to like romance movies",
                  "score": 1
                },
                {
                  "consumption_preference_id": "consumption_preferences_movie_adventure",
                  "name": "Likely to like adventure movies",
                  "score": 1
                },
                {
                  "consumption_preference_id": "consumption_preferences_movie_horror",
                  "name": "Likely to like horror movies",
                  "score": 1
                },
                {
                  "consumption_preference_id": "consumption_preferences_movie_musical",
                  "name": "Likely to like musical movies",
                  "score": 0
                },
                {
                  "consumption_preference_id": "consumption_preferences_movie_historical",
                  "name": "Likely to like historical movies",
                  "score": 0
                },
                {
                  "consumption_preference_id": "consumption_preferences_movie_science_fiction",
                  "name": "Likely to like science-fiction movies",
                  "score": 0
                },
                {
                  "consumption_preference_id": "consumption_preferences_movie_war",
                  "name": "Likely to like war movies",
                  "score": 0
                },
                {
                  "consumption_preference_id": "consumption_preferences_movie_drama",
                  "name": "Likely to like drama movies",
                  "score": 1
                },
                {
                  "consumption_preference_id": "consumption_preferences_movie_action",
                  "name": "Likely to like action movies",
                  "score": 0
                },
                {
                  "consumption_preference_id": "consumption_preferences_movie_documentary",
                  "name": "Likely to like documentary movies",
                  "score": 0
                }
              ]
            },
            {
              "consumption_preference_category_id": "consumption_preferences_music",
              "name": "Music Preferences",
              "consumption_preferences": [
                {
                  "consumption_preference_id": "consumption_preferences_music_rap",
                  "name": "Likely to like rap music",
                  "score": 1
                },
                {
                  "consumption_preference_id": "consumption_preferences_music_country",
                  "name": "Likely to like country music",
                  "score": 1
                },
                {
                  "consumption_preference_id": "consumption_preferences_music_r_b",
                  "name": "Likely to like R&B music",
                  "score": 1
                },
                {
                  "consumption_preference_id": "consumption_preferences_music_hip_hop",
                  "name": "Likely to like hip hop music",
                  "score": 1
                },
                {
                  "consumption_preference_id": "consumption_preferences_music_live_event",
                  "name": "Likely to attend live musical events",
                  "score": 1
                },
                {
                  "consumption_preference_id": "consumption_preferences_music_playing",
                  "name": "Likely to have experience playing music",
                  "score": 0
                },
                {
                  "consumption_preference_id": "consumption_preferences_music_latin",
                  "name": "Likely to like Latin music",
                  "score": 0
                },
                {
                  "consumption_preference_id": "consumption_preferences_music_rock",
                  "name": "Likely to like rock music",
                  "score": 0
                },
                {
                  "consumption_preference_id": "consumption_preferences_music_classical",
                  "name": "Likely to like classical music",
                  "score": 0
                }
              ]
            },
            {
              "consumption_preference_category_id": "consumption_preferences_reading",
              "name": "Reading Preferences",
              "consumption_preferences": [
                {
                  "consumption_preference_id": "consumption_preferences_read_frequency",
                  "name": "Likely to read often",
                  "score": 0.5
                },
                {
                  "consumption_preference_id": "consumption_preferences_books_entertainment_magazines",
                  "name": "Likely to read entertainment magazines",
                  "score": 1
                },
                {
                  "consumption_preference_id": "consumption_preferences_books_non_fiction",
                  "name": "Likely to read non-fiction books",
                  "score": 0
                },
                {
                  "consumption_preference_id": "consumption_preferences_books_financial_investing",
                  "name": "Likely to read financial investment books",
                  "score": 1
                },
                {
                  "consumption_preference_id": "consumption_preferences_books_autobiographies",
                  "name": "Likely to read autobiographical books",
                  "score": 0
                }
              ]
            },
            {
              "consumption_preference_category_id": "consumption_preferences_volunteering",
              "name": "Volunteering Preferences",
              "consumption_preferences": [
                {
                  "consumption_preference_id": "consumption_preferences_volunteer",
                  "name": "Likely to volunteer for social causes",
                  "score": 1
                }
              ]
            }
          ],
          "warnings": [
            {
              "warning_id": "CONTENT_TRUNCATED",
              "message": "For maximum accuracy while also optimizing processing time, only the first 250KB of input text (excluding markup) was analyzed. Accuracy levels off at approximately 3,000 words so this did not affect the accuracy of the profile."
            }
          ]
        }
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

    var teamDrawnCount = 0;
  function setupTeamMember(member, url, payload, i, doneFunc){

        return setTimeout(function(err) {
            drawTeamMember(member);
            teamDrawnCount++;
            doneFunc();
          }, Math.random() * 500 + 500);
//        return $.ajax({
//          type: 'POST',
//          data: payload,
//          url: url,
//          dataType: 'json',
//          success: function(data) {
//            console.log(member);
//            member.profile = profile_summary(data);
//            drawTeamMember(member);
//          },
//          error: function(err) {
//            member.profile = profile_summary(member.profile);
//            drawTeamMember(member);
//          }
//        });
  }

/*
Initially we had this function polling watson on the fly, however because we only have access to the lite account, the requests became blocked.
Hence, we downloaded the json responses watson outputted and put them in this final for the demo. The functionality is left below, in comments.
*/

    var candidateDrawnCount = 0;
  function setupCandidate(candidate, url, payload, i, doneFunc){
      return setTimeout(function(err) {
            drawCandidate(candidate);
            if (teamDrawnCount == team.length || teamMembersLoaded){
                var match = summary_match(teamAverage, candidate.profile);
                var percentage = Math.floor(match.personality * 100);
                candidate.matchPercentColumn.text(percentage + "%");
            }
          candidateDrawnCount++;
          doneFunc();
          }, Math.random() * 500 + 500);
//      return $.ajax({
//          type: 'POST',
//          data: payload,
//          url: url,
//          dataType: 'json',
//          success: function(data) {
//            candidate.profile = profile_summary(data);
//            drawCandidate(candidate);
//            if (teamMembersLoaded){
//                var match = summary_match(teamAverage, candidate.profile);
//                var percentage = Math.floor(match.personality * 100);
//                candidate.matchPercentColumn.text(percentage + "%");
//            }
//          },
//          error: function(err) {
//            candidate.profile = profile_summary(candidate.profile);
//            drawCandidate(candidate);
//            if (teamMembersLoaded){
//                var match = summary_match(teamAverage, candidate.profile);
//                var percentage = Math.floor(match.personality * 100);
//                candidate.matchPercentColumn.text(percentage + "%");
//            }
//          }
//    });
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

        //calls.push(setupTeamMember(team[i], url, payload, i));

        team[i].profile = profile_summary(team[i].profile);
        setupTeamMember(team[i], url, payload, i, function(){
            if (teamDrawnCount == team.length){
                teamAverage = averageProfileSummaries(team.map(x => x.profile));
                teamMembersLoaded = true;
                showPersonalityMatches();
            }
        });
    }


//    $.when.apply(null, calls).then(function(){
//        teamAverage = averageProfileSummaries(team.map(x => x.profile));
//        teamMembersLoaded = true;
//        showPersonalityMatches();
//    }, function(){
//        teamAverage = averageProfileSummaries(team.map(x => x.profile));
//        teamMembersLoaded = true;
//        showPersonalityMatches();
//    })


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

        candidates[i].profile = profile_summary(candidates[i].profile);
        //calls.push(setupCandidate(candidates[i], url, payload, i));
        setupCandidate(candidates[i], url, payload, i, function(){
            if (candidateDrawnCount == candidates.length){
                $loading.hide();
            }
        });

    }
//
//    $.when.apply(null, calls).then(function(){
//        $loading.hide();
//    }, function(){
//        $loading.hide();
//    })


  var interval = setInterval(function() {
    if (teamDrawnCount == team.length){
        teamAverage = averageProfileSummaries(team.map(x => x.profile));
        teamMembersLoaded = true;
        showPersonalityMatches();
        clearInterval(interval);
    }
  }, 100);

  }

  function showPersonalityMatches(){
      for (var i = 0; i < candidates.length; i++){
          if (  candidates[i].matchPercentColumn !== undefined){
              var match = summary_match(teamAverage, candidates[i].profile);
              var percentage = Math.floor(match.personality * 100);
              candidates[i].matchPercentColumn.text(percentage + "%");
          }
          else {
            return;
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
