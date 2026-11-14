# Preclinicians changelog

## This release (UI pass + learning engine)
- Spaced repetition for missed MCQs: a miss comes back after 10 minutes, then 1 day, 3 days, 1 week, 2 weeks and 1 month; passing the last gap clears it. A correct answer only moves a question up when it was actually due. Due questions are also mixed into normal Study Mode sessions (up to 30%). Settings are at the top of the pc-learning-engine script.
- "Due for review" card on the MCQ screen, and Due now / next review tags on Review missed.
- Performance: per-course Mastery % (questions answered correctly and not currently missed, out of the course bank) and Bayesian rating (Beta posterior from a neutral Beta(2,2) prior, 45-day half-life, 90% likely range, confidence label).
- Owner access: profiles.is_owner flag (run owner-access.sql once, then mark your email). Owner accounts skip the trial lock and payment, and show "Owner" in the menu chip and profile.
- UI fixes: landing spacing, tick marks, login/signup/trial/payment cards, menu layering and SVG icons, profile stat cards, Home quick-tool text overflow, landing SVG icons, About credit.
- File organised: changelog moved here, file map and section banners added, account CSS gathered into one style block.

## Earlier versions
Moved out of index.html (these were HTML comments at the top of the file). Newest entries are not guaranteed to be first; version tags are in each line.

- v323: 3-day free trial with every feature open, then one-time NGN 2,000 lifetime payment; login service errors now shown on screen
- v322: Supabase login/sign-up/reset screens (required), annual Premium at NGN 2,000 via Paystack with server-side verification on Vercel
- v321: free/premium paywall (daily free MCQ and flashcard limits; exam mode, missed review and planner locked), Paystack and Flutterwave checkout, access codes; off until PC_SETTINGS.PREMIUM.ENABLED is true
- v320: screen experience pass - phone and laptop layout, visual polish, session focus mode, dark-mode fixes
- v319: Biochemistry flashcards medically reviewed (all 861 cards; 11 corrections)
- v318: Embryology flashcards reviewed (400 cards): 11 corrections, mostly internal contradictions (luteo-placental shift, cochlear duct turns, spinal cord level at birth, CSF onset, nail timing, causes-of-anomaly percentages, sperm morphology, orchidopexy age, ultimobranchial body)
- v317: Embryology accuracy review: all 1,058 MCQs checked; corrected 3 items (blastocyst hatching and implantation-completion items had a second defensible option; cochlear duct completes 2.5 turns by week 8, not 10)
- v316: Biochemistry accuracy review: all 2,150 MCQs checked; corrected 8 explanations (B12/methylmalonic acidaemia, haem oxygenase iron state, purine atom sources, ribonucleotide reductase, bicarbonate buffer pKa, ferritin, enzyme specificity)
- v315: Anatomy accuracy review: corrected 52 MCQs and 14 flashcards (wrong or misleading explanations, ambiguous stems, one wrong keyed answer set, a correct distractor) and removed repeated sentences in explanations
- v313: user accounts (Firebase email/password: sign up, log in, password reset, log out) and required WhatsApp community step; edit PC_SETTINGS at the top of <head> to switch them on.
- v312: homepage banner photo enhanced (cleaned compression artefacts, 2x resolution 1720x904 for sharp display on high-density screens, edge-aware sharpening); lighter overlay on the right so the photo shows clearly
- v311: removed 12 cross-subject duplicate MCQs (one copy of each kept in the best-fitting topic); 2 new Biochemistry MCQs keep every Biochemistry topic at 50
- v310: Biochemistry flashcards expanded to at least 20 per topic (446 new exam-standard cards)
- v309: Biochemistry MCQ expansion, part 3: 287 more exam-standard MCQs; all 43 Biochemistry topics now have 50 MCQs each.
- v308: Dark mode: question navigator now shows answered (green) and unanswered (orange) numbers as in light mode.
- v307: Biochemistry MCQ expansion, part 2: 298 more exam-standard MCQs; Lipid metabolism, Molecular biology and Protein/nitrogen metabolism topics now have 50 MCQs each (28 of 43 topics done).
- v306: Biochemistry MCQ expansion, part 1: 223 new exam-standard MCQs; 12 topics (Basic biochemistry, Carbohydrate metabolism, Energy and nutrition) now have 50 MCQs each.
- v305: Save plan, Add task and Search notes buttons now work in previews and embedded viewers that block form submission; clearer message when a required field is missing.
- v304: About page rewritten; unused image credits removed. Restructured with an at-a-glance panel, how the content is prepared, and data privacy.
- v303: Homepage banner image replaced with an embedded photo (works offline); credit for the previous Wikimedia image removed.
- v302: Back navigation added (Back button in the top bar; browser and phone back buttons now step through pages, and from a running quiz back to its setup). Dark mode: note boxes, practical steps, recall boxes and table headers no longer show light backgrounds behind light text; hidden recall answers stay hidden until tapped.
- v301: Study Planner launched as its own page: exam countdown and automatic daily pace, spaced reviews (1/3/7/14/30 days), one-tap MCQs and flashcards per topic, weak-topic list from MCQ results, focus timer, 7-day activity, syllabus coverage. Old manual timetable hidden.
- v300: Student community removed (menu item, page, sign-in/discussion script and the external Supabase library).
- v299: Histology expanded: 173 new exam-standard MCQs (every topic now has at least 35) and 26 new structured flashcards (every topic now has at least 20).
- v298: Histology review. Removed 85 duplicate/generic/flawed MCQs and 102 duplicate/generic flashcards; rewrote 324 thin MCQ explanations; corrected/expanded 68 flashcard answers.
- v297: Biochemistry flashcards expanded: 89 new exam-standard structured cards on previously uncovered areas across all 43 Biochemistry topics (at least two per topic).
- v296: Biochemistry flashcards medical-accuracy review: all 326 Biochemistry flashcards read; 5 corrected (rennin in humans, prothrombin-time factors, nitric oxide/cGMP grouping, essential pentosuria enzyme name, nucleosome turns).
- v295: Biochemistry: 271 one-line MCQ explanations expanded to full teaching explanations (mechanism, clinical relevance, key distinctions). No answer keys changed.
- v294: Biochemistry medical-accuracy review: all 1,342 Biochemistry MCQs read for answer key and explanation accuracy; 7 items corrected (prothrombin-time factors, Garrod stem, essential pentosuria distractor, cytochrome oxidase metal, iron storage stem, inner-membrane marker option, HBV/HCC wording).
- v293: Summary Notes now follow the Master Table of Contents for all five subjects (199 topics in ToC sections); existing notes moved under their ToC topics; misfiled histology removed from Anatomy General notes; every topic has its own Practise button.
- v292: Biochemistry re-filed to the Master Table of Contents (8 sections, 43 topics); every item reviewed; 458 duplicates, off-subject and below-standard items removed. Summary Notes Practise buttons now point to the matching ToC topic for every subject.
- v291: Physiology re-filed to the Master Table of Contents (7 sections, 36 topics); every item reviewed; 1,075 duplicates, off-subject and below-standard items removed; template prefixes stripped from question text.
- v289: Embryology re-filed to the Master Table of Contents (3 sections, 19 topics); every item reviewed; 529 duplicates and below-standard items removed.
- v290: Histology re-filed to the Master Table of Contents (2 sections, 19 topics); every item reviewed; 331 duplicates, off-subject and below-standard items removed.
- v288: Exam-standard clean-up: removed 2,803 flawed items (multi-answer MCQs, Both/Neither options, flashcards copied from MCQs, statement-only cards, duplicates).
- v287: Anatomy re-filed to the approved Master Table of Contents: 9 sections, 82 topics; every Anatomy MCQ and flashcard reviewed and given a fixed topic code; 62 items moved to Embryology/Histology/Physiology.
- v286: Hero photo hides itself cleanly if it cannot load (no stray caption text); blue background shows instead.
- v285: Mobile hero: "MBBS PART I" stamp no longer overlaps the hero text.
- v284: Fixes: page now renders in standards mode (removed stray "\n" text before the doctype); logo stored once as WebP; mobile menu starts closed.
- v283: Anatomy filtering refinement: once an item has a specific audited region-topic label, region filters now respect that label rather than allowing incidental words in the question stem to shift it into another region. This improves consistency of region/topic selection; item-by-item faculty review is still required for ambiguous legacy entries.
- v282: Medical audit batch 8: clarified phrenic referral only when diaphragmatic peritoneum is irritated in gallbladder disease; expanded common fibular nerve branch and sensory territory explanation; qualified variable ureter/iliac-vessel relationship where matching item is present. Targeted content corrections; not full independent certification.
- vBatch4: Targeted medical-content audit: strengthened explanations for embryology derivatives, placental barrier, diaphragm development, histology, neutrophil circulation lifespan, oxygen-haemoglobin curve and ALT; corrected mismatch between neutrophil lifespan stem and explanation. Explanation-focused pass, not full faculty certification.
- v278: Targeted medical-content audit batch 3: corrected explanation accuracy and anatomical/developmental distinctions for round window, thyrocervical trunk, annulus fibrosus, tensor tympani, anterior digastric, nasopharynx, auditory tube and hypoglossal nerve. Existing answer keys preserved in this explanation-only pass.
- v278: Anatomy imported-paper MCQs received item-specific explanations; clarified the inferior-gluteal-nerve stem; noted variability in SA-node arterial supply and traditional cranial-accessory/vagal terminology. Removed exact repeated MCQ prompts from the main bank. Structural validation is not independent certification of all question-bank items.
- v281: Medical audit batch 5: refined explanations for 10 selected high-yield Anatomy, Embryology and Biochemistry items; clarified variability and limits of common exam rules. Existing answer indices preserved after checking the keyed options for these selected items. This is a targeted review, not full independent medical certification.
- v281: Medical audit batch 6: corrected a definite omphalocele/gastroschisis stem-key mismatch and repaired an unrelated congenital-anomaly explanation; reclassified the birth-defect item.
- Audit 13: Corrected two ECG stems that called the P wave and QRS complex “intervals”; both are ECG components, while PR and QT are intervals. Targeted wording correction only.
- Audit 12: fixed accidental literal backspace characters in the cardiovascular case/calculation regex so its word-boundary matching works; adjusted exact Physiology duplicate cleanup to retain the first occurrence as documented.
- Physiology exam-standard expansion Batch 2: added original single-best-answer MCQs with explanations and structured theory prompts with model-answer outlines. Structural validation only; independent faculty review remains advisable.
- Histology MCQ de-duplication (2026-11-02): replaced 91 repeated or near-repeated Histology MCQs with new applied and comparison questions in the same chapters. Faculty review recommended.
- Histology MCQ audit (2026-11-02): fixed 1 answer key with no correct option, 4 items with two correct options, rebuilt distractors on about 170 auto-generated items, corrected 1 mucociliary-escalator option, and replaced 9 near-duplicate items with new questions. Faculty review recommended.
- Histology flashcard exam-style rewrite (2026-11-02): about 330 one-line MCQ-style Histology flashcards rewritten in place as Part I theory prompts (short notes, differentiate, describe) with model answers; 26 misfiled cards re-topicked; Light Microscopy topped up to 20. Faculty review recommended.
- Histology flashcard expansion (2026-11-02): added 139 original Histology flashcards (about 5 per topic across 28 topics), deduplicated against existing fronts. Educational content; faculty review is recommended.
- Histology exam-bank expansion (2026-11-02): added 200 original Part I MBBS MCQs with explanations and 100 exam-oriented theory prompts with model-answer outlines across 20 topics. New questions are deduplicated against the existing Histology banks and answer positions are balanced. Educational content; faculty review is recommended.
- Histology MCQ quality pass (2026-11-02): removed 104 low-quality or repetitive items (60 with Both/Neither distractors, 22 with None distractors, 14 with weak distractors, and 8 near-duplicates). Retained 715 questions across all 17 Histology topics; normalized prompt duplicates are absent. Reclassified two general cell-biology questions into Cell Structure and Histological Techniques. This is not an independent medical certification.
- v247 Histology medical audit pass 3: clarified rickets versus osteomalacia, narrowed a glandular epithelial stem, qualified the connective-tissue fibroblast claim, replaced an overbroad organ-stroma question with reticular connective tissue, clarified the true vocal ligament, diversified a duplicate bone-cell question, and reclassified a GI-wall flashcard. Targeted review only; not independent verification of every item.
