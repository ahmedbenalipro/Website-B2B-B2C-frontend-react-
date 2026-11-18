export const regions = [
  { id: 'france', label: 'France', detail: 'Parisian French', flag: 'FR' },
  { id: 'switzerland', label: 'Switzerland', detail: 'Swiss · septante / nonante', flag: 'CH' },
  { id: 'belgium', label: 'Belgium', detail: 'Belgian · septante / nonante', flag: 'BE' },
  { id: 'luxembourg', label: 'Luxembourg', detail: 'Luxembourgish French', flag: 'LU' },
  { id: 'english', label: 'English', detail: 'International', flag: 'EN' },
]

export const defaultScripts = {
  france: [
    {
      id: 'opener',
      stage: 'OPENER',
      prompt: {
        b2b: 'Bonjour, Camille à l’appareil. Je vous appelle car nous aidons les équipes commerciales à mieux qualifier leurs opportunités, sans alourdir leur quotidien. Est-ce que je peux vous prendre trente secondes ?',
        b2c: 'Bonjour, Camille à l’appareil. Nous réalisons une courte enquête sur les habitudes de service dans votre région. Est-ce que vous auriez deux minutes à m’accorder ?',
      },
      responses: [
        { label: 'Oui, je vous écoute', next: 'discovery' },
        { label: 'On utilise déjà un outil', next: 'alternative' },
        { label: 'Envoyez-moi un e-mail', next: 'email' },
        { label: 'Ce n’est pas moi qui décide', next: 'referral' },
      ],
    },
    {
      id: 'discovery',
      stage: 'DÉCOUVERTE',
      prompt: {
        b2b: 'Merci. Aujourd’hui, comment vos équipes suivent-elles les conversations et les retours de leurs prospects ?',
        b2c: 'Merci. Pour commencer, quel critère compte le plus pour vous lorsque vous choisissez ce type de service ?',
      },
      responses: [
        { label: 'Un suivi plus régulier nous aiderait', next: 'value' },
        { label: 'Nous sommes bien équipés', next: 'alternative' },
        { label: 'Je préfère en rester là', next: 'close' },
      ],
    },
    {
      id: 'alternative',
      stage: 'POSITIONNEMENT',
      prompt: {
        b2b: 'Je comprends, et je ne vous propose pas de tout remplacer. Qu’est-ce qui fonctionne bien aujourd’hui, et qu’aimeriez-vous simplifier ?',
        b2c: 'C’est tout à fait logique. Qu’est-ce qui vous satisfait le plus dans votre solution actuelle ?',
      },
      responses: [
        { label: 'Il reste quelques points à améliorer', next: 'value' },
        { label: 'Tout fonctionne très bien', next: 'close' },
        { label: 'Je peux en parler maintenant', next: 'discovery' },
      ],
    },
    {
      id: 'value',
      stage: 'PROPOSITION',
      prompt: {
        b2b: 'C’est précisément le type de sujet sur lequel nous pouvons vous apporter un regard utile. Seriez-vous disponible pour un échange de quinze minutes cette semaine ?',
        b2c: 'Merci, votre retour est précieux. Souhaitez-vous recevoir le récapitulatif de l’enquête une fois celle-ci terminée ?',
      },
      responses: [
        { label: 'Oui, avec plaisir', next: 'close' },
        { label: 'Rappelez-moi plus tard', next: 'close' },
        { label: 'Non merci', next: 'close' },
      ],
    },
    {
      id: 'email',
      stage: 'SUIVI',
      prompt: {
        b2b: 'Bien sûr. Pour vous envoyer quelque chose de pertinent plutôt qu’un message générique, quel sujet devrait-on aborder en priorité ?',
        b2c: 'Avec plaisir. À quelle adresse puis-je vous transmettre les résultats lorsque l’enquête sera terminée ?',
      },
      responses: [
        { label: 'La prise de rendez-vous', next: 'value' },
        { label: 'Les résultats de l’enquête', next: 'close' },
        { label: 'Je préfère ne pas communiquer mon adresse', next: 'close' },
      ],
    },
    {
      id: 'referral',
      stage: 'ORIENTATION',
      prompt: {
        b2b: 'Merci de me le préciser. Qui serait la personne la mieux placée pour échanger sur ce sujet au sein de votre équipe ?',
        b2c: 'Je comprends. Y a-t-il quelqu’un dans votre foyer qui serait plus à même de répondre à quelques questions ?',
      },
      responses: [
        { label: 'Je peux vous donner son nom', next: 'close' },
        { label: 'Je ne sais pas qui contacter', next: 'close' },
      ],
    },
    {
      id: 'close',
      stage: 'CONCLUSION',
      prompt: {
        b2b: 'Parfait, je vous remercie pour votre temps. Je note la suite convenue et vous souhaite une excellente journée.',
        b2c: 'Merci beaucoup pour votre participation. Votre réponse nous aide réellement, et je vous souhaite une très bonne journée.',
      },
      responses: [
        { label: 'Revenir au début', next: 'opener' },
        { label: 'Terminer la conversation', next: 'opener' },
      ],
    },
  ],
  switzerland: [
    {
      id: 'opener',
      stage: 'OUVERTURE',
      prompt: {
        b2b: 'Bonjour, Camille à l’appareil. Je me permets de vous appeler : nous aidons les équipes commerciales à mieux suivre leurs échanges, de façon très simple. Auriez-vous une petite minute ?',
        b2c: 'Bonjour, Camille à l’appareil. Nous menons une courte enquête sur les services de la région. Est-ce que vous auriez deux minutes à m’accorder ?',
      },
      responses: [
        { label: 'Oui, volontiers', next: 'discovery' },
        { label: 'Nous avons déjà une solution', next: 'alternative' },
        { label: 'Vous pouvez m’écrire', next: 'email' },
        { label: 'Je ne suis pas la bonne personne', next: 'referral' },
      ],
    },
    {
      id: 'discovery',
      stage: 'ÉCHANGE',
      prompt: {
        b2b: 'Merci beaucoup. Comment votre équipe s’organise-t-elle aujourd’hui pour garder le fil des échanges avec ses prospects ?',
        b2c: 'Merci beaucoup. Dans votre choix, quel serait le critère le plus important pour vous ?',
      },
      responses: [
        { label: 'Un meilleur suivi serait utile', next: 'value' },
        { label: 'Nous sommes déjà bien organisés', next: 'alternative' },
        { label: 'Je préfère m’arrêter là', next: 'close' },
      ],
    },
    {
      id: 'alternative',
      stage: 'BESOINS',
      prompt: {
        b2b: 'Je comprends tout à fait. Sans rien changer à ce qui fonctionne, y a-t-il un aspect que vous aimeriez rendre un peu plus simple ?',
        b2c: 'C’est tout à fait compréhensible. Qu’appréciez-vous le plus dans la solution que vous utilisez actuellement ?',
      },
      responses: [
        { label: 'Il y a encore une marge de progrès', next: 'value' },
        { label: 'Nous sommes très satisfaits', next: 'close' },
        { label: 'Je peux vous en dire plus', next: 'discovery' },
      ],
    },
    {
      id: 'value',
      stage: 'PROPOSITION',
      prompt: {
        b2b: 'C’est justement là que nous pouvons peut-être vous apporter quelque chose. Est-ce qu’un échange de quinze minutes la semaine prochaine vous conviendrait ?',
        b2c: 'Merci pour votre retour. Souhaitez-vous que nous vous fassions parvenir les résultats de l’enquête ?',
      },
      responses: [
        { label: 'Oui, volontiers', next: 'close' },
        { label: 'Une autre fois serait mieux', next: 'close' },
        { label: 'Non merci', next: 'close' },
      ],
    },
    {
      id: 'email',
      stage: 'SUIVI',
      prompt: {
        b2b: 'Avec plaisir. Afin de vous envoyer uniquement les informations utiles, quel sujet vous intéresserait le plus ?',
        b2c: 'Bien sûr. Où pouvons-nous vous transmettre les résultats lorsque l’enquête sera terminée ?',
      },
      responses: [
        { label: 'La gestion des rendez-vous', next: 'value' },
        { label: 'Le résumé de l’enquête', next: 'close' },
        { label: 'Je préfère ne pas laisser d’adresse', next: 'close' },
      ],
    },
    {
      id: 'referral',
      stage: 'ORIENTATION',
      prompt: {
        b2b: 'Merci de me l’indiquer. À qui pourrais-je m’adresser pour discuter de ce sujet au sein de votre entreprise ?',
        b2c: 'Je comprends. Y aurait-il une personne de votre entourage qui serait plus à même de répondre ?',
      },
      responses: [
        { label: 'Je peux vous orienter', next: 'close' },
        { label: 'Je ne saurais pas vous dire', next: 'close' },
      ],
    },
    {
      id: 'close',
      stage: 'CONCLUSION',
      prompt: {
        b2b: 'Parfait, merci beaucoup pour votre disponibilité. Je note ce que nous avons convenu et vous souhaite une excellente journée.',
        b2c: 'Merci beaucoup pour votre temps. Votre réponse nous est très utile, et je vous souhaite une belle journée.',
      },
      responses: [
        { label: 'Revenir au début', next: 'opener' },
        { label: 'Terminer la conversation', next: 'opener' },
      ],
    },
  ],
  belgium: [
    {
      id: 'opener',
      stage: 'OUVERTURE',
      prompt: {
        b2b: 'Bonjour, Camille à l’appareil. Je vous appelle parce que nous aidons les équipes commerciales à suivre leurs contacts plus facilement. Est-ce que vous avez une petite minute ?',
        b2c: 'Bonjour, Camille à l’appareil. On réalise une petite enquête sur les services dans votre région. Vous auriez deux minutes à nous consacrer ?',
      },
      responses: [
        { label: 'Oui, allez-y', next: 'discovery' },
        { label: 'On a déjà notre solution', next: 'alternative' },
        { label: 'Envoyez-moi un mail', next: 'email' },
        { label: 'Je ne m’occupe pas de ça', next: 'referral' },
      ],
    },
    {
      id: 'discovery',
      stage: 'ÉCHANGE',
      prompt: {
        b2b: 'Merci. Comment vous faites aujourd’hui pour suivre les échanges de votre équipe avec les prospects ?',
        b2c: 'Merci. Pour vous, c’est quoi le critère le plus important pour ce genre de service ?',
      },
      responses: [
        { label: 'Un suivi plus simple nous aiderait', next: 'value' },
        { label: 'On est déjà bien équipés', next: 'alternative' },
        { label: 'Je vais m’arrêter là', next: 'close' },
      ],
    },
    {
      id: 'alternative',
      stage: 'BESOINS',
      prompt: {
        b2b: 'Je comprends. Sans changer ce qui marche déjà, qu’est-ce que vous aimeriez encore simplifier dans votre suivi ?',
        b2c: 'C’est logique. Qu’est-ce qui vous plaît le plus dans la solution que vous avez maintenant ?',
      },
      responses: [
        { label: 'On pourrait encore améliorer certains points', next: 'value' },
        { label: 'On est très contents comme ça', next: 'close' },
        { label: 'Je peux vous expliquer', next: 'discovery' },
      ],
    },
    {
      id: 'value',
      stage: 'PROPOSITION',
      prompt: {
        b2b: 'C’est justement là qu’on peut vous aider. Vous seriez disponible pour en discuter quinze minutes la semaine prochaine ?',
        b2c: 'Merci pour votre avis. Ça vous intéresserait de recevoir les résultats de l’enquête quand elle sera terminée ?',
      },
      responses: [
        { label: 'Oui, avec plaisir', next: 'close' },
        { label: 'Rappelez-moi une autre fois', next: 'close' },
        { label: 'Non merci', next: 'close' },
      ],
    },
    {
      id: 'email',
      stage: 'SUIVI',
      prompt: {
        b2b: 'Bien sûr. Pour vous envoyer quelque chose qui vous concerne, quel sujet devrait-on mettre en avant ?',
        b2c: 'Bien sûr. À quelle adresse est-ce qu’on peut vous envoyer les résultats ?',
      },
      responses: [
        { label: 'Les prises de rendez-vous', next: 'value' },
        { label: 'Les résultats de l’enquête', next: 'close' },
        { label: 'Je préfère ne pas donner mon adresse', next: 'close' },
      ],
    },
    {
      id: 'referral',
      stage: 'ORIENTATION',
      prompt: {
        b2b: 'Merci de me le dire. Qui serait la bonne personne à contacter chez vous pour en parler ?',
        b2c: 'Je comprends. Est-ce qu’une autre personne de votre ménage serait plus à même de répondre ?',
      },
      responses: [
        { label: 'Je peux vous aiguiller', next: 'close' },
        { label: 'Je ne sais pas trop', next: 'close' },
      ],
    },
    {
      id: 'close',
      stage: 'CONCLUSION',
      prompt: {
        b2b: 'Parfait, merci pour votre temps. Je note la suite et vous souhaite une très bonne journée.',
        b2c: 'Merci beaucoup d’avoir pris le temps. Votre avis nous aide bien, et je vous souhaite une bonne journée.',
      },
      responses: [
        { label: 'Revenir au début', next: 'opener' },
        { label: 'Terminer la conversation', next: 'opener' },
      ],
    },
  ],
  luxembourg: [
    {
      id: 'opener',
      stage: 'OUVERTURE',
      prompt: {
        b2b: 'Bonjour, Camille à l’appareil. Je me permets de vous contacter : nous aidons les équipes commerciales à mieux suivre leurs échanges, avec une approche très simple. Auriez-vous un instant ?',
        b2c: 'Bonjour, Camille à l’appareil. Nous menons une courte enquête sur les services au Luxembourg. Auriez-vous deux minutes à nous accorder ?',
      },
      responses: [
        { label: 'Oui, je vous en prie', next: 'discovery' },
        { label: 'Nous avons déjà un outil', next: 'alternative' },
        { label: 'Vous pouvez m’envoyer un e-mail', next: 'email' },
        { label: 'Je ne suis pas la personne concernée', next: 'referral' },
      ],
    },
    {
      id: 'discovery',
      stage: 'ÉCHANGE',
      prompt: {
        b2b: 'Merci. Comment vos équipes assurent-elles aujourd’hui le suivi des conversations avec leurs prospects ?',
        b2c: 'Merci. Quel serait, pour vous, le critère le plus important dans le choix d’un tel service ?',
      },
      responses: [
        { label: 'Un suivi plus clair nous serait utile', next: 'value' },
        { label: 'Notre organisation nous convient', next: 'alternative' },
        { label: 'Je préfère en rester là', next: 'close' },
      ],
    },
    {
      id: 'alternative',
      stage: 'BESOINS',
      prompt: {
        b2b: 'Je comprends parfaitement. En complément de ce qui fonctionne déjà, y a-t-il un point que vous souhaiteriez simplifier ?',
        b2c: 'C’est tout à fait compréhensible. Qu’appréciez-vous le plus dans le service dont vous disposez actuellement ?',
      },
      responses: [
        { label: 'Quelques améliorations seraient bienvenues', next: 'value' },
        { label: 'Nous sommes pleinement satisfaits', next: 'close' },
        { label: 'Je peux vous donner davantage de contexte', next: 'discovery' },
      ],
    },
    {
      id: 'value',
      stage: 'PROPOSITION',
      prompt: {
        b2b: 'C’est précisément sur ce point que nous pourrions vous accompagner. Un échange de quinze minutes la semaine prochaine pourrait-il vous convenir ?',
        b2c: 'Merci pour votre retour. Souhaiteriez-vous recevoir les résultats de l’enquête lorsqu’ils seront disponibles ?',
      },
      responses: [
        { label: 'Oui, bien volontiers', next: 'close' },
        { label: 'Une autre date serait préférable', next: 'close' },
        { label: 'Non merci', next: 'close' },
      ],
    },
    {
      id: 'email',
      stage: 'SUIVI',
      prompt: {
        b2b: 'Bien entendu. Quel sujet vous serait le plus utile, afin que je puisse vous adresser quelques informations ciblées ?',
        b2c: 'Bien entendu. À quelle adresse pourrions-nous vous faire parvenir les résultats de l’enquête ?',
      },
      responses: [
        { label: 'Le suivi des rendez-vous', next: 'value' },
        { label: 'Les résultats de l’enquête', next: 'close' },
        { label: 'Je préfère ne pas partager mon adresse', next: 'close' },
      ],
    },
    {
      id: 'referral',
      stage: 'ORIENTATION',
      prompt: {
        b2b: 'Merci de me l’avoir précisé. Pourriez-vous m’indiquer la personne qui serait la mieux placée pour en discuter ?',
        b2c: 'Je comprends. Une autre personne de votre foyer serait-elle davantage disponible pour répondre ?',
      },
      responses: [
        { label: 'Je peux vous orienter', next: 'close' },
        { label: 'Je ne saurais vous renseigner', next: 'close' },
      ],
    },
    {
      id: 'close',
      stage: 'CONCLUSION',
      prompt: {
        b2b: 'Parfait, merci beaucoup pour votre disponibilité. Je note la suite convenue et vous souhaite une excellente journée.',
        b2c: 'Merci beaucoup pour votre participation. Votre retour nous est précieux ; je vous souhaite une très bonne journée.',
      },
      responses: [
        { label: 'Revenir au début', next: 'opener' },
        { label: 'Terminer la conversation', next: 'opener' },
      ],
    },
  ],
  english: [
    {
      id: 'opener',
      stage: 'OPENER',
      prompt: {
        b2b: 'Hello, this is Camille. I’m reaching out because we help sales teams make prospect follow-up feel a little more considered, without adding another layer of admin. Have I caught you with a moment?',
        b2c: 'Hello, this is Camille. We’re conducting a short survey about the services people use in your area. Would you have two minutes to share your perspective?',
      },
      responses: [
        { label: 'Sure, go ahead', next: 'discovery' },
        { label: 'We already use a solution', next: 'alternative' },
        { label: 'Could you email me?', next: 'email' },
        { label: 'I’m not the right person', next: 'referral' },
      ],
    },
    {
      id: 'discovery',
      stage: 'DISCOVERY',
      prompt: {
        b2b: 'Thank you. How does your team currently keep track of conversations and follow-ups with prospective customers?',
        b2c: 'Thank you. When you choose a service like this, what tends to matter most to you?',
      },
      responses: [
        { label: 'A more consistent follow-up would help', next: 'value' },
        { label: 'We’re already well set up', next: 'alternative' },
        { label: 'I’d rather leave it there', next: 'close' },
      ],
    },
    {
      id: 'alternative',
      stage: 'NEEDS',
      prompt: {
        b2b: 'That makes sense. Without changing what already works, is there anything you would still like to make a little easier?',
        b2c: 'Of course. What do you value most about the service you use today?',
      },
      responses: [
        { label: 'There’s still room to improve', next: 'value' },
        { label: 'We’re very happy with it', next: 'close' },
        { label: 'I can share a little more', next: 'discovery' },
      ],
    },
    {
      id: 'value',
      stage: 'PROPOSITION',
      prompt: {
        b2b: 'That’s exactly where we may be able to help. Would a brief, fifteen-minute conversation next week be useful?',
        b2c: 'Thanks for sharing that. Would you like us to send you a summary of the survey results when they’re ready?',
      },
      responses: [
        { label: 'Yes, that sounds good', next: 'close' },
        { label: 'Could we speak another time?', next: 'close' },
        { label: 'No, thank you', next: 'close' },
      ],
    },
    {
      id: 'email',
      stage: 'FOLLOW-UP',
      prompt: {
        b2b: 'Absolutely. So I can send something relevant rather than a generic note, what would be most useful to you?',
        b2c: 'Of course. Where would you like us to send the survey results once they’re available?',
      },
      responses: [
        { label: 'Making follow-up easier', next: 'value' },
        { label: 'The survey summary', next: 'close' },
        { label: 'I’d rather not share my address', next: 'close' },
      ],
    },
    {
      id: 'referral',
      stage: 'ROUTING',
      prompt: {
        b2b: 'Thanks for letting me know. Who would be the best person on your team for me to speak with about this?',
        b2c: 'I understand. Is there someone else in your household who might be better placed to answer a few questions?',
      },
      responses: [
        { label: 'I can point you in the right direction', next: 'close' },
        { label: 'I’m not sure who that would be', next: 'close' },
      ],
    },
    {
      id: 'close',
      stage: 'CLOSING',
      prompt: {
        b2b: 'That’s lovely, thank you for your time. I’ll make a note of what we agreed and hope you have a very good day.',
        b2c: 'Thank you for taking the time to share your thoughts. It’s genuinely helpful, and I hope you have a lovely day.',
      },
      responses: [
        { label: 'Start again', next: 'opener' },
        { label: 'End the conversation', next: 'opener' },
      ],
    },
  ],
}

export const leads = [
  { name: 'Sophie Laurent', title: 'VP of Sales', company: 'Maison Rive', city: 'Paris', region: 'france', phone: '+33 6 12 34 56 78', initials: 'SL', color: 'rose' },
  { name: 'Marc Dubois', title: 'Managing Director', company: 'Atelier Nord', city: 'Lyon', region: 'france', phone: '+33 6 23 45 67 89', initials: 'MD', color: 'blue' },
  { name: 'Claire Morel', title: 'Head of Operations', company: 'Bellecour Studio', city: 'Genève', region: 'switzerland', phone: '+41 79 234 56 78', initials: 'CM', color: 'green' },
  { name: 'Thomas Peeters', title: 'Founder', company: 'Northstar Works', city: 'Bruxelles', region: 'belgium', phone: '+32 475 12 34 56', initials: 'TP', color: 'gold' },
  { name: 'Émilie Weber', title: 'Commercial Director', company: 'Cercle & Co.', city: 'Luxembourg', region: 'luxembourg', phone: '+352 621 234 567', initials: 'ÉW', color: 'lavender' },
  { name: 'Julien Martin', title: 'Customer Experience Lead', company: 'Les Éditions', city: 'Bordeaux', region: 'france', phone: '+33 6 34 56 78 90', initials: 'JM', color: 'mint' },
]

export const objections = [
  { id: 'time', title: 'No time right now', heading: 'Respect the moment', copy: '“I completely understand — I caught you at a busy time.” “Would a quick call tomorrow morning or later this week suit you better?”' },
  { id: 'email', title: 'Send me an email', heading: 'Make it relevant', copy: '“Of course. So I only send what is useful, may I ask what your main priority is right now?” “I’ll keep it brief and follow up only if it makes sense.”' },
  { id: 'budget', title: 'No budget / Too expensive', heading: 'Explore the value', copy: '“That’s fair — it needs to make sense financially.” “Would it be helpful to first look at the time or cost your current process takes?”' },
  { id: 'number', title: 'Where did you get my number?', heading: 'Be transparent', copy: '“That’s a reasonable question. Your business contact details were listed as a professional contact in our outreach records.” “I’m happy to note your preference and make sure we don’t contact you again.”' },
]

export const outcomes = [
  { id: 'qualified', label: 'Qualified' },
  { id: 'callback', label: 'Callback' },
  { id: 'not-interested', label: 'Not interested' },
  { id: 'no-answer', label: 'No answer' },
]

export const outcomeLabels = Object.fromEntries(outcomes.map(({ id, label }) => [id, label]))
