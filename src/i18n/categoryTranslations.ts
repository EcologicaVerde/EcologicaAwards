import type { Language } from "@/i18n/translations";

export interface CategoryLocalizedText {
  title: string;
  shortTitle: string;
  description: string;
}

export const CATEGORY_TRANSLATIONS: Record<
  Exclude<Language, "pt">,
  Record<string, CategoryLocalizedText>
> = {
  en: {
    "game-of-the-year": {
      title: "Game of the Year",
      shortTitle: "Game of the Year",
      description:
        "Recognizing a game that delivers the absolute best experience across all creative and technical fields.",
    },
    "best-game-direction": {
      title: "Best Game Direction",
      shortTitle: "Game Direction",
      description:
        "Awarded for outstanding creative vision and innovation in game direction and design.",
    },
    "best-narrative": {
      title: "Best Narrative",
      shortTitle: "Narrative",
      description:
        "For outstanding storytelling and narrative development in a game.",
    },
    "best-art-direction": {
      title: "Best Art Direction",
      shortTitle: "Art Direction",
      description:
        "For outstanding creative and technical achievement in artistic design and animation.",
    },
    "best-score-and-music": {
      title: "Best Score and Music",
      shortTitle: "Score & Music",
      description:
        "For outstanding music, inclusive of score, original song and licensed soundtrack.",
    },
    "best-audio-design": {
      title: "Best Audio Design",
      shortTitle: "Audio Design",
      description:
        "Recognizing the best in-game audio and sound design.",
    },
    "best-performance": {
      title: "Best Performance",
      shortTitle: "Performance",
      description:
        "Awarded to an individual for voice-over acting, motion and performance capture.",
    },
    "games-for-impact": {
      title: "Games for Impact",
      shortTitle: "Impact",
      description:
        "For a thought-provoking game with a pro-social meaning or message.",
    },
    "innovation-in-accessibility": {
      title: "Innovation in Accessibility",
      shortTitle: "Accessibility",
      description:
        "Recognizing software and features that advance accessibility for a wider audience.",
    },
    "best-ongoing": {
      title: "Best Ongoing",
      shortTitle: "Ongoing",
      description:
        "Awarded to a game for outstanding development of ongoing content that evolves the player experience over time.",
    },
    "best-community-support": {
      title: "Best Community Support",
      shortTitle: "Community Support",
      description:
        "Recognizing a game for outstanding community support, transparency and responsiveness.",
    },
    "best-independent-game": {
      title: "Best Independent Game",
      shortTitle: "Independent",
      description:
        "For outstanding creative and technical achievement in a game made outside the traditional publisher system.",
    },
    "best-debut-indie-game": {
      title: "Best Debut Indie Game",
      shortTitle: "Debut Indie",
      description:
        "For the best debut game created by a new independent studio.",
    },
    "best-mobile-game": {
      title: "Best Mobile Game",
      shortTitle: "Mobile",
      description: "For the best game playable on a mobile device.",
    },
    "best-vr-ar": {
      title: "Best VR / AR",
      shortTitle: "VR / AR",
      description:
        "For the best game experience playable in virtual or augmented reality.",
    },
    "best-action-game": {
      title: "Best Action Game",
      shortTitle: "Action",
      description:
        "For the best game in the action genre focused primarily on combat.",
    },
    "best-action-adventure": {
      title: "Best Action / Adventure",
      shortTitle: "Action / Adventure",
      description:
        "For the best action/adventure game combining combat with traversal and puzzle solving.",
    },
    "best-role-playing": {
      title: "Best Role Playing",
      shortTitle: "Role Playing",
      description:
        "For the best game designed with rich player character customization and progression.",
    },
    "best-fighting": {
      title: "Best Fighting",
      shortTitle: "Fighting",
      description:
        "For the best game designed primarily around head-to-head combat.",
    },
    "best-family": {
      title: "Best Family",
      shortTitle: "Family",
      description:
        "For the best game appropriate for family play, irrespective of genre or platform.",
    },
    "best-sim-strategy": {
      title: "Best Sim / Strategy",
      shortTitle: "Sim / Strategy",
      description:
        "Best game focused on real-time or turn-based simulation or strategy gameplay.",
    },
    "best-sports-racing": {
      title: "Best Sports / Racing",
      shortTitle: "Sports / Racing",
      description:
        "For the best traditional and non-traditional sports and racing game.",
    },
    "best-multiplayer": {
      title: "Best Multiplayer",
      shortTitle: "Multiplayer",
      description:
        "For outstanding online multiplayer gameplay and design, including co-op and competitive experiences.",
    },
    "best-adaptation": {
      title: "Best Adaptation",
      shortTitle: "Adaptation",
      description:
        "Recognizing outstanding creative work that faithfully and authentically adapts a video game to another entertainment medium.",
    },
    "best-user-creation": {
      title: "Best User Creation",
      shortTitle: "User Creation",
      description:
        "Celebrating extraordinary mods, servers, and community-built experiences.",
    },
    "content-creator-of-the-year": {
      title: "Content Creator of the Year",
      shortTitle: "Content Creator",
      description:
        "For a streamer or content creator who has made an important and positive impact on the community.",
    },
    "best-esports-athlete": {
      title: "Best Esports Athlete",
      shortTitle: "Esports Athlete",
      description:
        "The esports athlete judged to be the most outstanding for performance and conduct.",
    },
    "best-esports-game": {
      title: "Best Esports Game",
      shortTitle: "Esports Game",
      description:
        "For the game that has delivered the best overall esports experience to players.",
    },
    "best-esports-team": {
      title: "Best Esports Team",
      shortTitle: "Esports Team",
      description:
        "Recognizing a specific esports team judged the most outstanding for performance and conduct.",
    },
    "most-anticipated-game": {
      title: "Most Anticipated Game",
      shortTitle: "Most Anticipated",
      description:
        "Recognizing an announced game that has demonstrably illustrated potential to push the gaming medium forward.",
    },
  },

  es: {
    "game-of-the-year": {
      title: "Juego del Año",
      shortTitle: "Juego del Año",
      description:
        "Reconociendo al juego que ofrece la mejor experiencia absoluta en todos los ámbitos creativos y técnicos.",
    },
    "best-game-direction": {
      title: "Mejor Dirección de Juego",
      shortTitle: "Dirección",
      description:
        "Premiando una visión creativa excepcional e innovación en dirección y diseño.",
    },
    "best-narrative": {
      title: "Mejor Narrativa",
      shortTitle: "Narrativa",
      description:
        "Por su historia sobresaliente y desarrollo narrativo excepcional.",
    },
    "best-art-direction": {
      title: "Mejor Dirección de Arte",
      shortTitle: "Dirección de Arte",
      description:
        "Por logros creativos y técnicos destacados en diseño artístico y animación.",
    },
    "best-score-and-music": {
      title: "Mejor Banda Sonora y Música",
      shortTitle: "Banda Sonora",
      description:
        "Por música excepcional, incluyendo partitura original, canciones y arreglos.",
    },
    "best-audio-design": {
      title: "Mejor Diseño de Audio",
      shortTitle: "Diseño de Audio",
      description:
        "Reconociendo el mejor diseño sonoro y efectos de audio dentro del juego.",
    },
    "best-performance": {
      title: "Mejor Actuación",
      shortTitle: "Actuación",
      description:
        "Premiando a un intérprete por actuación de voz o captura de movimiento.",
    },
    "games-for-impact": {
      title: "Juegos con Impacto",
      shortTitle: "Impacto",
      description:
        "Para un juego reflexivo con un mensaje o significado social positivo.",
    },
    "innovation-in-accessibility": {
      title: "Innovación en Accesibilidad",
      shortTitle: "Accesibilidad",
      description:
        "Reconociendo software y funciones que amplían la accesibilidad para todo el público.",
    },
    "best-ongoing": {
      title: "Mejor Juego en Curso",
      shortTitle: "En Curso",
      description:
        "Premiando el desarrollo continuo de contenidos que hacen evolucionar la experiencia con el tiempo.",
    },
    "best-community-support": {
      title: "Mejor Soporte a la Comunidad",
      shortTitle: "Soporte Comunidad",
      description:
        "Reconociendo juegos con apoyo comunitario ejemplar, transparencia y diálogo constante.",
    },
    "best-independent-game": {
      title: "Mejor Juego Independiente",
      shortTitle: "Mejor Indie",
      description:
        "Por logros creativos y técnicos destacados en un juego creado fuera del sistema tradicional.",
    },
    "best-debut-indie-game": {
      title: "Mejor Debut Indie",
      shortTitle: "Debut Indie",
      description:
        "Al mejor juego debut creado por un nuevo estudio independiente.",
    },
    "best-mobile-game": {
      title: "Mejor Juego Móvil",
      shortTitle: "Móvil",
      description: "Al mejor juego disponible para dispositivos móviles.",
    },
    "best-vr-ar": {
      title: "Mejor Juego VR / AR",
      shortTitle: "VR / AR",
      description:
        "A la mejor experiencia jugable en realidad virtual o realidad aumentada.",
    },
    "best-action-game": {
      title: "Mejor Juego de Acción",
      shortTitle: "Acción",
      description:
        "Al mejor juego del género de acción centrado principalmente en el combate.",
    },
    "best-action-adventure": {
      title: "Mejor Juego de Acción / Aventura",
      shortTitle: "Acción / Aventura",
      description:
        "Al mejor juego que combina combate con exploración y resolución de acertijos.",
    },
    "best-role-playing": {
      title: "Mejor RPG",
      shortTitle: "Mejor RPG",
      description:
        "Al mejor juego con rica personalización de personajes, progresión y sistemas de rol.",
    },
    "best-fighting": {
      title: "Mejor Juego de Lucha",
      shortTitle: "Lucha",
      description:
        "Al mejor juego diseñado principalmente en torno al combate cara a cara.",
    },
    "best-family": {
      title: "Mejor Juego Familiar",
      shortTitle: "Familiar",
      description:
        "Al mejor juego apropiado para disfrutar en familia en cualquier plataforma.",
    },
    "best-sim-strategy": {
      title: "Mejor Simulación / Estrategia",
      shortTitle: "Sim / Estrategia",
      description:
        "Al mejor juego enfocado en simulación o estrategia en tiempo real o por turnos.",
    },
    "best-sports-racing": {
      title: "Mejor Deportes / Carreras",
      shortTitle: "Deportes / Carreras",
      description:
        "Al mejor juego de deportes tradicionales, alternativos o de carreras.",
    },
    "best-multiplayer": {
      title: "Mejor Multijugador",
      shortTitle: "Multijugador",
      description:
        "A la mejor experiencia multijugador en línea, tanto cooperativa como competitiva.",
    },
    "best-adaptation": {
      title: "Mejor Adaptación",
      shortTitle: "Adaptación",
      description:
        "Reconociendo obras creativas que adaptan fielmente videojuegos a otros medios.",
    },
    "best-user-creation": {
      title: "Mejor Creación de Usuario",
      shortTitle: "Creación de Usuario",
      description:
        "Celebrando mods, servidores y experiencias extraordinarias creadas por la comunidad.",
    },
    "content-creator-of-the-year": {
      title: "Creador de Contenido del Año",
      shortTitle: "Creador del Año",
      description:
        "Para un streamer o creador de contenido que dejó un impacto positivo en la comunidad.",
    },
    "best-esports-athlete": {
      title: "Mejor Atleta de Esports",
      shortTitle: "Atleta Esports",
      description:
        "El jugador con el desempeño más sobresaliente en la escena competitiva del año.",
    },
    "best-esports-game": {
      title: "Mejor Juego de Esports",
      shortTitle: "Juego Esports",
      description:
        "Al juego que ofreció la mejor experiencia competitiva y de torneos a los jugadores.",
    },
    "best-esports-team": {
      title: "Mejor Equipo de Esports",
      shortTitle: "Equipo Esports",
      description:
        "Reconociendo al equipo de esports más dominante y constante de la temporada.",
    },
    "most-anticipated-game": {
      title: "Juego Más Esperado",
      shortTitle: "Más Esperado",
      description:
        "Reconociendo a un título anunciado con el potencial de elevar el nivel de la industria.",
    },
  },

  ru: {
    "game-of-the-year": {
      title: "Игра года",
      shortTitle: "Игра года",
      description:
        "Главная награда за игру, подарившую лучший опыт во всех творческих и технических аспектах.",
    },
    "best-game-direction": {
      title: "Лучшая режиссура",
      shortTitle: "Режиссура",
      description:
        "За выдающееся творческое видение и инновации в геймдизайне и постановке.",
    },
    "best-narrative": {
      title: "Лучший сюжет",
      shortTitle: "Сюжет",
      description:
        "За выдающееся повествование, сценарий и развитие истории в игре.",
    },
    "best-art-direction": {
      title: "Лучший арт-дирекшн",
      shortTitle: "Арт-дирекшн",
      description:
        "За впечатляющие творческие и технические достижения в визуальном стиле и анимации.",
    },
    "best-score-and-music": {
      title: "Лучший саундтрек и музыка",
      shortTitle: "Саундтрек",
      description:
        "За выдающуюся музыку, включая оригинальный саундтрек и аранжировки.",
    },
    "best-audio-design": {
      title: "Лучший звук",
      shortTitle: "Звук",
      description:
        "Награда за лучшее звуковое оформление и аудиодизайн в игре.",
    },
    "best-performance": {
      title: "Лучшая актёрская игра",
      shortTitle: "Актёрская игра",
      description:
        "За выдающуюся озвучку и актёрскую игру с захватом движений.",
    },
    "games-for-impact": {
      title: "Игры со смыслом",
      shortTitle: "Игры со смыслом",
      description:
        "За глубокую игру с важным социальным посылом и смыслом.",
    },
    "innovation-in-accessibility": {
      title: "Инновации в доступности",
      shortTitle: "Доступность",
      description:
        "За технологии и функции, делающие игры доступными для более широкой аудитории.",
    },
    "best-ongoing": {
      title: "Лучшая развивающаяся игра",
      shortTitle: "Развивающаяся",
      description:
        "За выдающуюся долгосрочную поддержку и регулярное развитие игрового опыта.",
    },
    "best-community-support": {
      title: "Лучшая поддержка сообщества",
      shortTitle: "Поддержка",
      description:
        "За образцовую работу с игроками, открытость и активный диалог с сообществом.",
    },
    "best-independent-game": {
      title: "Лучшая инди-игра",
      shortTitle: "Лучшая инди",
      description:
        "За выдающиеся творческие и технические достижения среди независимых проектов.",
    },
    "best-debut-indie-game": {
      title: "Лучший инди-дебют",
      shortTitle: "Инди-дебют",
      description:
        "За лучшую дебютную игру, созданную новой независимой студией.",
    },
    "best-mobile-game": {
      title: "Лучшая мобильная игра",
      shortTitle: "Мобильная",
      description: "За лучшую игру для мобильных устройств.",
    },
    "best-vr-ar": {
      title: "Лучшая VR / AR игра",
      shortTitle: "VR / AR",
      description:
        "За лучший игровой опыт в виртуальной или дополненной реальности.",
    },
    "best-action-game": {
      title: "Лучший экшен",
      shortTitle: "Экшен",
      description:
        "За лучшую игру в жанре экшен с акцентом на динамичные сражения.",
    },
    "best-action-adventure": {
      title: "Лучший экшен / приключения",
      shortTitle: "Экшен / Прикл.",
      description:
        "За лучшую игру, сочетающую бои, исследование мира и головоломки.",
    },
    "best-role-playing": {
      title: "Лучшая RPG",
      shortTitle: "Лучшая RPG",
      description:
        "За лучшую ролевую игру с глубокой прокачкой и развитием персонажей.",
    },
    "best-fighting": {
      title: "Лучший файтинг",
      shortTitle: "Файтинг",
      description:
        "За лучшую игру, построенную вокруг поединков один на один.",
    },
    "best-family": {
      title: "Лучшая семейная игра",
      shortTitle: "Семейная",
      description:
        "За лучшую игру для совместного времяпрепровождения всей семьёй.",
    },
    "best-sim-strategy": {
      title: "Лучший симулятор / стратегия",
      shortTitle: "Сим / Стратегия",
      description:
        "За лучший симулятор или стратегию в реальном времени или пошаговом формате.",
    },
    "best-sports-racing": {
      title: "Лучшая спортивная / гоночная игра",
      shortTitle: "Спорт / Гонки",
      description:
        "За лучшую спортивную или гоночную игру года.",
    },
    "best-multiplayer": {
      title: "Лучший мультиплеер",
      shortTitle: "Мультиплеер",
      description:
        "За лучший сетевой, кооперативный или соревновательный опыт.",
    },
    "best-adaptation": {
      title: "Лучшая адаптация",
      shortTitle: "Адаптация",
      description:
        "За выдающуюся экранизацию видеоигры в кино, сериале или анимации.",
    },
    "best-user-creation": {
      title: "Лучшее пользовательское творение",
      shortTitle: "Моды / UGC",
      description:
        "Награда за выдающиеся моды, серверы и проекты, созданные игроками.",
    },
    "content-creator-of-the-year": {
      title: "Контент-мейкер года",
      shortTitle: "Контент-мейкер",
      description:
        "Для стримера или автора контента, оказавшего заметное позитивное влияние на сообщество.",
    },
    "best-esports-athlete": {
      title: "Лучший киберспортсмен",
      shortTitle: "Киберспортсмен",
      description:
        "Игрок, показавший наиболее впечатляющие результаты на киберспортивной сцене.",
    },
    "best-esports-game": {
      title: "Лучшая киберспортивная игра",
      shortTitle: "Киберспорт-игра",
      description:
        "За игру, обеспечившую лучший соревновательный и турнирный опыт.",
    },
    "best-esports-team": {
      title: "Лучшая киберспортивная команда",
      shortTitle: "Команда года",
      description:
        "Награда самой сильной и стабильной киберспортивной команде сезона.",
    },
    "most-anticipated-game": {
      title: "Самая ожидаемая игра",
      shortTitle: "Самая ожидаемая",
      description:
        "За анонсированный проект с огромным потенциалом продвинуть индустрию вперёд.",
    },
  },
};
