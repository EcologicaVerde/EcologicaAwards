export type Language = "pt" | "en" | "es" | "ru";

export const LANGUAGES: { code: Language; label: string; nativeName: string }[] = [
  { code: "pt", label: "PT", nativeName: "Português" },
  { code: "en", label: "EN", nativeName: "English" },
  { code: "es", label: "ES", nativeName: "Español" },
  { code: "ru", label: "RU", nativeName: "Русский" },
];

export interface UITranslations {
  htmlLang: string;
  pageTitle: string;
  brandSubtitle: string;
  nav: {
    categories: string;
    vote: string;
    community: string;
    results: string;
    editProfileTooltip: string;
    languageLabel: string;
  };
  defaultUsername: string;
  hero: {
    badge: string;
    description: string;
    startVoting: string;
    reviewCategories: string;
    continueVoting: string;
    viewResults: string;
  };
  identityBar: {
    label: string;
    changeAvatar: string;
    uploadAvatar: string;
    avatarButtonTitle: string;
    progressTitle: string;
    allVoted: string;
    remainingOne: string;
    remainingMany: (count: number) => string;
    savedLocally: string;
  };
  categoriesSection: {
    eyebrow: string;
    heading: string;
    searchPlaceholder: string;
    filterAll: string;
    filterPending: string;
    filterVoted: string;
    emptySearchTitle: string;
    emptySearchDesc: string;
    clearSearch: string;
    emptyPendingTitle: string;
    emptyPendingDesc: string;
    openResults: string;
    emptyVotedTitle: string;
    emptyVotedDesc: string;
    showAll: string;
  };
  categoryCard: {
    catPrefix: string;
    featured: string;
    voted: string;
    nomineesCount: (count: number) => string;
    yourPick: string;
    change: string;
    openAndVote: string;
  };
  voting: {
    allCategories: string;
    votedOf: (voted: number, total: number) => string;
    results: string;
    categoryStep: (num: string, total: string) => string;
    featured: string;
    prev: string;
    next: string;
    finish: string;
    yourVoteInCategory: string;
    hoverPrompt: string;
    nextCategory: string;
    viewBallotCard: string;
    voteRecorded: string;
    selectNominee: string;
  };
  results: {
    backToCategories: string;
    profile: string;
    downloadPng: string;
    generating: string;
    pngSuccess: string;
    pngError: string;
    incompletePrompt: (voted: number, total: number, remaining: number) => string;
    voteNextPending: string;
    officialCard: (edition: string) => string;
    votesBy: string;
    categoriesCount: (voted: number, total: number) => string;
    notSelectedYet: string;
    clickToChooseGoty: string;
    changeVote: string;
    vote: string;
    noVote: string;
    clickToVote: string;
    footerHint: string;
    clearAllVotes: string;
    confirmResetTitle: string;
    confirmResetDesc: string;
    cancel: string;
    confirmClear: string;
  };
  profileDialog: {
    title: string;
    description: string;
    avatarImage: string;
    uploadPhoto: string;
    urlButton: string;
    apply: string;
    urlPlaceholder: string;
    invalidImageType: string;
    invalidImageProcess: string;
    usernameLabel: string;
    savedNote: string;
    cancel: string;
    save: string;
    close: string;
  };
  footer: {
    communityAwards: string;
    voterProfile: string;
  };
  toasts: {
    voteRecorded: (title: string) => string;
    votesCleared: string;
    profileUpdated: string;
  };
  audio: {
    label: string;
    play: string;
    pause: string;
    mute: string;
    unmute: string;
    volume: string;
    clickToEnable: string;
  };
  community: {
    eyebrow: string;
    title: string;
    subtitle: string;
    tabLeaders: string;
    tabByCategory: string;
    refresh: string;
    refreshing: string;
    participants: string;
    totalVotes: string;
    unlocked: string;
    liveMode: string;
    antiBiasBanner: string;
    startVotingCta: string;
    lockedTitle: string;
    lockedDesc: string;
    voteToUnlock: string;
    leaderBadge: string;
    yourVoteBadge: string;
    tiedBadge: string;
    noVotesYet: string;
    votesCount: (count: number) => string;
    categoryPartialTitle: string;
    categoryTotalVotes: (count: number) => string;
    searchPlaceholder: string;
    viewAllCharts: string;
  };
  genres: Record<string, string>;
  years: Record<string, string>;
}

export const TRANSLATIONS: Record<Language, UITranslations> = {
  pt: {
    htmlLang: "pt-BR",
    pageTitle: "Ecológica Awards — Votação da Comunidade",
    brandSubtitle: "Comunidade Ecológica Verde",
    nav: {
      categories: "Categorias",
      vote: "Votação",
      community: "Comunidade",
      results: "Meus Resultados",
      editProfileTooltip: "Editar Avatar e Username",
      languageLabel: "Idioma",
    },
    defaultUsername: "Edite_Nome",
    hero: {
      badge: "Premiação da Comunidade da Ecológica Verde • Edição 2026",
      description:
        "Escolha os destaques do ano em cada categoria, registre seus votos na comunidade Ecológica Verde e gere seu cartão oficial de resultados para compartilhar.",
      startVoting: "Iniciar votação",
      reviewCategories: "Revisar categorias",
      continueVoting: "Continuar votação",
      viewResults: "Ver meus resultados",
    },
    identityBar: {
      label: "Identificação para o cartão final",
      changeAvatar: "Alterar avatar",
      uploadAvatar: "Enviar avatar",
      avatarButtonTitle: "Alterar imagem de avatar",
      progressTitle: "Progresso dos votos",
      allVoted: "Todas as categorias votadas",
      remainingOne: "Falta 1 categoria",
      remainingMany: (count) => `Faltam ${count} categorias`,
      savedLocally: "Salvo automaticamente",
    },
    categoriesSection: {
      eyebrow: "Categorias Oficiais",
      heading: "Explore e registre seu voto",
      searchPlaceholder: "Buscar categoria ou indicado...",
      filterAll: "Todas",
      filterPending: "Pendentes",
      filterVoted: "Votadas",
      emptySearchTitle: "Nenhuma categoria ou indicado encontrado.",
      emptySearchDesc: "Tente buscar por outro termo ou limpe o filtro.",
      clearSearch: "Limpar busca",
      emptyPendingTitle: "Você já votou em todas as categorias!",
      emptyPendingDesc:
        "Seu cartão oficial já está completo e pronto para compartilhar.",
      openResults: "Abrir Meus Resultados",
      emptyVotedTitle: "Nenhuma categoria votada ainda.",
      emptyVotedDesc: "Selecione uma categoria para começar a votar.",
      showAll: "Ver todas as categorias",
    },
    categoryCard: {
      catPrefix: "CAT.",
      featured: "Destaque",
      voted: "Votado",
      nomineesCount: (count) => `${count} indicados`,
      yourPick: "Sua escolha",
      change: "Alterar",
      openAndVote: "Abrir categoria e votar",
    },
    voting: {
      allCategories: "Todas as categorias",
      votedOf: (voted, total) => `${voted} de ${total} votadas`,
      results: "Resultados",
      categoryStep: (num, total) => `CATEGORIA ${num} DE ${total}`,
      featured: "Destaque",
      prev: "Anterior",
      next: "Próxima",
      finish: "Finalizar",
      yourVoteInCategory: "Seu voto nesta categoria:",
      hoverPrompt:
        "Passe o mouse sobre os indicados e clique no seu favorito para registrar o voto.",
      nextCategory: "Próxima categoria",
      viewBallotCard: "Ver meu cartão de resultados",
      voteRecorded: "Voto registrado",
      selectNominee: "Selecionar indicado",
    },
    results: {
      backToCategories: "Categorias",
      profile: "Perfil",
      downloadPng: "Baixar PNG",
      generating: "Gerando...",
      pngSuccess: "Cartão salvo em PNG com fundo transparente.",
      pngError:
        "Não foi possível gerar a imagem (verifique se o avatar usa URL com bloqueio CORS ou envie uma foto do dispositivo).",
      incompletePrompt: (voted, total, remaining) =>
        `Você completou ${voted} de ${total} categorias. Você pode exportar agora ou preencher as ${remaining} restantes.`,
      voteNextPending: "Votar na próxima pendente",
      officialCard: (edition) => `Cartão Oficial • ${edition}`,
      votesBy: "Votos de",
      categoriesCount: (voted, total) => `${voted}/${total} categorias`,
      notSelectedYet: "Ainda não selecionado",
      clickToChooseGoty: "Clique para escolher seu Jogo do Ano",
      changeVote: "Alterar voto",
      vote: "Votar",
      noVote: "Sem voto",
      clickToVote: "Clique para votar",
      footerHint:
        "Dica: clique em qualquer categoria no cartão acima para alterar seu voto instantaneamente.",
      clearAllVotes: "Limpar todos os votos",
      confirmResetTitle: "Limpar todos os votos?",
      confirmResetDesc:
        "Essa ação removerá todas as escolhas feitas até agora neste navegador. Seu avatar e username serão mantidos.",
      cancel: "Cancelar",
      confirmClear: "Confirmar limpeza",
    },
    profileDialog: {
      title: "Perfil do Usuário",
      description:
        "Personalize seu avatar e username para aparecer no cartão oficial de resultados do Ecológica Awards.",
      avatarImage: "Imagem de Avatar",
      uploadPhoto: "Enviar foto",
      urlButton: "URL",
      apply: "Aplicar",
      urlPlaceholder: "https://exemplo.com/avatar.png",
      invalidImageType: "Envie um arquivo de imagem (PNG, JPG ou WEBP).",
      invalidImageProcess: "Não foi possível processar esta imagem.",
      usernameLabel: "Username da Comunidade",
      savedNote: "Salvo apenas no seu navegador para gerar seu cartão final.",
      cancel: "Cancelar",
      save: "Salvar perfil",
      close: "Fechar",
    },
    footer: {
      communityAwards: "Premiação da Comunidade da Ecológica Verde",
      voterProfile: "Perfil do Usuário",
    },
    toasts: {
      voteRecorded: (title) => `Voto registrado: ${title}`,
      votesCleared: "Todos os votos foram limpos.",
      profileUpdated: "Perfil atualizado.",
    },
    audio: {
      label: "Trilha",
      play: "Tocar música",
      pause: "Pausar música",
      mute: "Silenciar",
      unmute: "Ativar som",
      volume: "Volume da música",
      clickToEnable: "Clique para ativar o áudio",
    },
    community: {
      eyebrow: "Votação Acumulada",
      title: "Gráficos da Comunidade",
      subtitle:
        "Acompanhe os líderes e a distribuição de votos em tempo real. Para não influenciar sua escolha, cada categoria só é revelada após o seu voto.",
      tabLeaders: "Mais Votados",
      tabByCategory: "Por Categoria",
      refresh: "Atualizar",
      refreshing: "Atualizando...",
      participants: "Participantes",
      totalVotes: "Votos acumulados",
      unlocked: "Categorias liberadas",
      liveMode: "Contagem oficial ativa",
      antiBiasBanner:
        "Para não influenciar quem ainda vai votar, os resultados de cada categoria ficam bloqueados até você registrar seu voto nela.",
      startVotingCta: "Ir para votação",
      lockedTitle: "Resultado oculto",
      lockedDesc: "Vote nesta categoria para revelar o gráfico da comunidade.",
      voteToUnlock: "Votar para revelar",
      leaderBadge: "Mais votado",
      yourVoteBadge: "Seu voto",
      tiedBadge: "Empate na liderança",
      noVotesYet: "Sem votos registrados",
      votesCount: (count) => (count === 1 ? "1 voto" : `${count} votos`),
      categoryPartialTitle: "Parcial da comunidade nesta categoria",
      categoryTotalVotes: (count) =>
        count === 1 ? "1 voto total" : `${count} votos totais`,
      searchPlaceholder: "Filtrar categoria...",
      viewAllCharts: "Ver painel completo da comunidade",
    },
    genres: {
      "Ação / Aventura": "Ação / Aventura",
      "Mundo Aberto": "Mundo Aberto",
      Ação: "Ação",
      "Survival Horror": "Survival Horror",
      Direção: "Direção",
      Narrativa: "Narrativa",
      "Direção de Arte": "Direção de Arte",
      "Trilha Sonora": "Trilha Sonora",
      Áudio: "Áudio",
      Atuação: "Atuação",
      Impacto: "Impacto",
      Acessibilidade: "Acessibilidade",
      "Em Andamento": "Em Andamento",
      Comunidade: "Comunidade",
      Independente: "Independente",
      "Indie de Estreia": "Indie de Estreia",
      Mobile: "Mobile",
      "VR / AR": "VR / AR",
      RPG: "RPG",
      Luta: "Luta",
      Família: "Família",
      "Sim / Estratégia": "Sim / Estratégia",
      Simulação: "Simulação",
      Estratégia: "Estratégia",
      "Estratégia Tática": "Estratégia Tática",
      Esportes: "Esportes",
      Corrida: "Corrida",
      Multiplayer: "Multiplayer",
      "Série Animada": "Série Animada",
      Série: "Série",
      Filme: "Filme",
      "Filme Animado": "Filme Animado",
      "Criação da Comunidade": "Criação da Comunidade",
      "Streamer / Criador": "Streamer / Criador",
      "Criador de Conteúdo": "Criador de Conteúdo",
      "Atleta de Esports": "Atleta de Esports",
      Esports: "Esports",
      "Time de Esports": "Time de Esports",
      "Mais Aguardado": "Mais Aguardado",
    },
    years: {
      Contínuo: "Contínuo",
      "Em breve": "Em breve",
    },
  },

  en: {
    htmlLang: "en",
    pageTitle: "Ecológica Awards — Community Voting",
    brandSubtitle: "Ecológica Verde Community",
    nav: {
      categories: "Categories",
      vote: "Vote",
      community: "Community",
      results: "My Results",
      editProfileTooltip: "Edit Avatar & Username",
      languageLabel: "Language",
    },
    defaultUsername: "Edit_Name",
    hero: {
      badge: "Ecológica Verde Community Awards • 2026 Edition",
      description:
        "Pick the highlights of the year in every category, cast your votes for the Ecológica Verde community, and generate your official results card to share.",
      startVoting: "Start voting",
      reviewCategories: "Review categories",
      continueVoting: "Continue voting",
      viewResults: "View my results",
    },
    identityBar: {
      label: "Identity for your final card",
      changeAvatar: "Change avatar",
      uploadAvatar: "Upload avatar",
      avatarButtonTitle: "Change avatar image",
      progressTitle: "Voting progress",
      allVoted: "All categories voted",
      remainingOne: "1 category left",
      remainingMany: (count) => `${count} categories left`,
      savedLocally: "Saved automatically",
    },
    categoriesSection: {
      eyebrow: "Official Categories",
      heading: "Explore and cast your vote",
      searchPlaceholder: "Search category or nominee...",
      filterAll: "All",
      filterPending: "Pending",
      filterVoted: "Voted",
      emptySearchTitle: "No category or nominee found.",
      emptySearchDesc: "Try searching for another term or clear the filter.",
      clearSearch: "Clear search",
      emptyPendingTitle: "You have voted in every category!",
      emptyPendingDesc:
        "Your official card is complete and ready to share.",
      openResults: "Open My Results",
      emptyVotedTitle: "No categories voted yet.",
      emptyVotedDesc: "Select a category to start voting.",
      showAll: "View all categories",
    },
    categoryCard: {
      catPrefix: "CAT.",
      featured: "Featured",
      voted: "Voted",
      nomineesCount: (count) => `${count} nominees`,
      yourPick: "Your pick",
      change: "Change",
      openAndVote: "Open category & vote",
    },
    voting: {
      allCategories: "All categories",
      votedOf: (voted, total) => `${voted} of ${total} voted`,
      results: "Results",
      categoryStep: (num, total) => `CATEGORY ${num} OF ${total}`,
      featured: "Featured",
      prev: "Previous",
      next: "Next",
      finish: "Finish",
      yourVoteInCategory: "Your pick in this category:",
      hoverPrompt:
        "Hover over the nominees and click your favorite to cast your vote.",
      nextCategory: "Next category",
      viewBallotCard: "View my results card",
      voteRecorded: "Vote recorded",
      selectNominee: "Select nominee",
    },
    results: {
      backToCategories: "Categories",
      profile: "Profile",
      downloadPng: "Download PNG",
      generating: "Generating...",
      pngSuccess: "Card saved as transparent PNG.",
      pngError:
        "Could not generate the image (check if your avatar URL blocks CORS or upload a photo from your device).",
      incompletePrompt: (voted, total, remaining) =>
        `You completed ${voted} of ${total} categories. You can export now or vote in the remaining ${remaining}.`,
      voteNextPending: "Vote next pending",
      officialCard: (edition) => `Official Card • ${edition}`,
      votesBy: "Votes by",
      categoriesCount: (voted, total) => `${voted}/${total} categories`,
      notSelectedYet: "Not selected yet",
      clickToChooseGoty: "Click to choose your Game of the Year",
      changeVote: "Change vote",
      vote: "Vote",
      noVote: "No vote",
      clickToVote: "Click to vote",
      footerHint:
        "Tip: click any category on the card above to update your pick immediately.",
      clearAllVotes: "Clear all votes",
      confirmResetTitle: "Clear all votes?",
      confirmResetDesc:
        "This will remove all picks made so far in this browser. Your avatar and username will be kept.",
      cancel: "Cancel",
      confirmClear: "Confirm clear",
    },
    profileDialog: {
      title: "User Profile",
      description:
        "Customize your avatar and username to display on your official Ecológica Awards results card.",
      avatarImage: "Avatar Image",
      uploadPhoto: "Upload photo",
      urlButton: "URL",
      apply: "Apply",
      urlPlaceholder: "https://example.com/avatar.png",
      invalidImageType: "Please upload an image file (PNG, JPG, or WEBP).",
      invalidImageProcess: "Could not process this image.",
      usernameLabel: "Community Username",
      savedNote: "Stored only in your browser to generate your final card.",
      cancel: "Cancel",
      save: "Save profile",
      close: "Close",
    },
    footer: {
      communityAwards: "Ecológica Verde Community Awards",
      voterProfile: "User Profile",
    },
    toasts: {
      voteRecorded: (title) => `Vote recorded: ${title}`,
      votesCleared: "All votes cleared.",
      profileUpdated: "Profile updated.",
    },
    audio: {
      label: "Theme",
      play: "Play music",
      pause: "Pause music",
      mute: "Mute",
      unmute: "Unmute",
      volume: "Music volume",
      clickToEnable: "Click to enable audio",
    },
    community: {
      eyebrow: "Cumulative Voting",
      title: "Community Charts",
      subtitle:
        "Track the leaders and full vote breakdown in real time. To prevent bias, each category is revealed only after you cast your vote in it.",
      tabLeaders: "Most Voted",
      tabByCategory: "By Category",
      refresh: "Refresh",
      refreshing: "Refreshing...",
      participants: "Voters",
      totalVotes: "Total votes",
      unlocked: "Unlocked categories",
      liveMode: "Official community tally",
      antiBiasBanner:
        "To avoid influencing voters, results for each category stay locked until you cast your vote in it.",
      startVotingCta: "Go to voting",
      lockedTitle: "Result hidden",
      lockedDesc: "Vote in this category to reveal the community chart.",
      voteToUnlock: "Vote to unlock",
      leaderBadge: "Most voted",
      yourVoteBadge: "Your vote",
      tiedBadge: "Tied for 1st",
      noVotesYet: "No votes yet",
      votesCount: (count) => (count === 1 ? "1 vote" : `${count} votes`),
      categoryPartialTitle: "Community tally for this category",
      categoryTotalVotes: (count) =>
        count === 1 ? "1 total vote" : `${count} total votes`,
      searchPlaceholder: "Filter category...",
      viewAllCharts: "View full community dashboard",
    },
    genres: {
      "Ação / Aventura": "Action / Adventure",
      "Mundo Aberto": "Open World",
      Ação: "Action",
      "Survival Horror": "Survival Horror",
      Direção: "Direction",
      Narrativa: "Narrative",
      "Direção de Arte": "Art Direction",
      "Trilha Sonora": "Score & Music",
      Áudio: "Audio",
      Atuação: "Performance",
      Impacto: "Impact",
      Acessibilidade: "Accessibility",
      "Em Andamento": "Ongoing",
      Comunidade: "Community",
      Independente: "Independent",
      "Indie de Estreia": "Debut Indie",
      Mobile: "Mobile",
      "VR / AR": "VR / AR",
      RPG: "RPG",
      Luta: "Fighting",
      Família: "Family",
      "Sim / Estratégia": "Sim / Strategy",
      Simulação: "Simulation",
      Estratégia: "Strategy",
      "Estratégia Tática": "Tactical Strategy",
      Esportes: "Sports",
      Corrida: "Racing",
      Multiplayer: "Multiplayer",
      "Série Animada": "Animated Series",
      Série: "Series",
      Filme: "Movie",
      "Filme Animado": "Animated Movie",
      "Criação da Comunidade": "User Creation",
      "Streamer / Criador": "Content Creator",
      "Criador de Conteúdo": "Content Creator",
      "Atleta de Esports": "Esports Athlete",
      Esports: "Esports",
      "Time de Esports": "Esports Team",
      "Mais Aguardado": "Most Anticipated",
    },
    years: {
      Contínuo: "Ongoing",
      "Em breve": "Coming Soon",
    },
  },

  es: {
    htmlLang: "es",
    pageTitle: "Ecológica Awards — Votación de la Comunidad",
    brandSubtitle: "Comunidad Ecológica Verde",
    nav: {
      categories: "Categorías",
      vote: "Votación",
      community: "Comunidad",
      results: "Mis Resultados",
      editProfileTooltip: "Editar Avatar y Usuario",
      languageLabel: "Idioma",
    },
    defaultUsername: "Editar_Nombre",
    hero: {
      badge: "Premiación de la Comunidad de Ecológica Verde • Edición 2026",
      description:
        "Elige lo mejor del año en cada categoría, registra tus votos en la comunidad Ecológica Verde y genera tu tarjeta oficial de resultados para compartir.",
      startVoting: "Iniciar votación",
      reviewCategories: "Revisar categorías",
      continueVoting: "Continuar votación",
      viewResults: "Ver mis resultados",
    },
    identityBar: {
      label: "Identificación para la tarjeta final",
      changeAvatar: "Cambiar avatar",
      uploadAvatar: "Subir avatar",
      avatarButtonTitle: "Cambiar imagen de avatar",
      progressTitle: "Progreso de votos",
      allVoted: "Todas las categorías votadas",
      remainingOne: "Falta 1 categoría",
      remainingMany: (count) => `Faltan ${count} categorías`,
      savedLocally: "Guardado automáticamente",
    },
    categoriesSection: {
      eyebrow: "Categorías Oficiales",
      heading: "Explora y registra tu voto",
      searchPlaceholder: "Buscar categoría o nominado...",
      filterAll: "Todas",
      filterPending: "Pendientes",
      filterVoted: "Votadas",
      emptySearchTitle: "No se encontró ninguna categoría o nominado.",
      emptySearchDesc: "Prueba con otro término o limpia el filtro.",
      clearSearch: "Limpiar búsqueda",
      emptyPendingTitle: "¡Ya votaste en todas las categorías!",
      emptyPendingDesc:
        "Tu tarjeta oficial está completa y lista para compartir.",
      openResults: "Abrir Mis Resultados",
      emptyVotedTitle: "Aún no hay categorías votadas.",
      emptyVotedDesc: "Selecciona una categoría para comenzar a votar.",
      showAll: "Ver todas las categorías",
    },
    categoryCard: {
      catPrefix: "CAT.",
      featured: "Destacada",
      voted: "Votado",
      nomineesCount: (count) => `${count} nominados`,
      yourPick: "Tu elección",
      change: "Cambiar",
      openAndVote: "Abrir categoría y votar",
    },
    voting: {
      allCategories: "Todas las categorías",
      votedOf: (voted, total) => `${voted} de ${total} votadas`,
      results: "Resultados",
      categoryStep: (num, total) => `CATEGORÍA ${num} DE ${total}`,
      featured: "Destacada",
      prev: "Anterior",
      next: "Siguiente",
      finish: "Finalizar",
      yourVoteInCategory: "Tu voto en esta categoría:",
      hoverPrompt:
        "Pasa el cursor sobre los nominados y haz clic en tu favorito para votar.",
      nextCategory: "Siguiente categoría",
      viewBallotCard: "Ver mi tarjeta de resultados",
      voteRecorded: "Voto registrado",
      selectNominee: "Seleccionar nominado",
    },
    results: {
      backToCategories: "Categorías",
      profile: "Perfil",
      downloadPng: "Descargar PNG",
      generating: "Generando...",
      pngSuccess: "Tarjeta guardada en PNG con fondo transparente.",
      pngError:
        "No se pudo generar la imagen (verifica si la URL del avatar bloquea CORS o sube una foto desde tu dispositivo).",
      incompletePrompt: (voted, total, remaining) =>
        `Completaste ${voted} de ${total} categorías. Puedes exportar ahora o votar en las ${remaining} restantes.`,
      voteNextPending: "Votar siguiente pendiente",
      officialCard: (edition) => `Tarjeta Oficial • ${edition}`,
      votesBy: "Votos de",
      categoriesCount: (voted, total) => `${voted}/${total} categorías`,
      notSelectedYet: "Aún no seleccionado",
      clickToChooseGoty: "Haz clic para elegir tu Juego del Año",
      changeVote: "Cambiar voto",
      vote: "Votar",
      noVote: "Sin voto",
      clickToVote: "Haz clic para votar",
      footerHint:
        "Consejo: haz clic en cualquier categoría de la tarjeta para cambiar tu voto al instante.",
      clearAllVotes: "Limpiar todos los votos",
      confirmResetTitle: "¿Limpiar todos los votos?",
      confirmResetDesc:
        "Esta acción eliminará todas tus elecciones en este navegador. Tu avatar y nombre de usuario se mantendrán.",
      cancel: "Cancelar",
      confirmClear: "Confirmar limpieza",
    },
    profileDialog: {
      title: "Perfil del Usuario",
      description:
        "Personaliza tu avatar y nombre de usuario para aparecer en tu tarjeta oficial de Ecológica Awards.",
      avatarImage: "Imagen de Avatar",
      uploadPhoto: "Subir foto",
      urlButton: "URL",
      apply: "Aplicar",
      urlPlaceholder: "https://ejemplo.com/avatar.png",
      invalidImageType: "Sube un archivo de imagen (PNG, JPG o WEBP).",
      invalidImageProcess: "No se pudo procesar esta imagen.",
      usernameLabel: "Usuario de la Comunidad",
      savedNote: "Guardado solo en tu navegador para generar tu tarjeta final.",
      cancel: "Cancelar",
      save: "Guardar perfil",
      close: "Cerrar",
    },
    footer: {
      communityAwards: "Premiación de la Comunidad de Ecológica Verde",
      voterProfile: "Perfil del Usuario",
    },
    toasts: {
      voteRecorded: (title) => `Voto registrado: ${title}`,
      votesCleared: "Se limpiaron todos los votos.",
      profileUpdated: "Perfil actualizado.",
    },
    audio: {
      label: "Música",
      play: "Reproducir música",
      pause: "Pausar música",
      mute: "Silenciar",
      unmute: "Activar sonido",
      volume: "Volumen de la música",
      clickToEnable: "Haz clic para activar el audio",
    },
    community: {
      eyebrow: "Votación Acumulada",
      title: "Gráficos de la Comunidad",
      subtitle:
        "Sigue a los líderes y el desglose de votos en tiempo real. Para no influir en tu elección, cada categoría solo se revela después de votar.",
      tabLeaders: "Más Votados",
      tabByCategory: "Por Categoría",
      refresh: "Actualizar",
      refreshing: "Actualizando...",
      participants: "Participantes",
      totalVotes: "Votos acumulados",
      unlocked: "Categorías desbloqueadas",
      liveMode: "Conteo oficial activo",
      antiBiasBanner:
        "Para no influir en quienes aún votan, los resultados de cada categoría permanecen bloqueados hasta que registres tu voto.",
      startVotingCta: "Ir a votar",
      lockedTitle: "Resultado oculto",
      lockedDesc: "Vota en esta categoría para ver el gráfico de la comunidad.",
      voteToUnlock: "Votar para revelar",
      leaderBadge: "Más votado",
      yourVoteBadge: "Tu voto",
      tiedBadge: "Empate en el 1.º puesto",
      noVotesYet: "Sin votos aún",
      votesCount: (count) => (count === 1 ? "1 voto" : `${count} votos`),
      categoryPartialTitle: "Parcial de la comunidad en esta categoría",
      categoryTotalVotes: (count) =>
        count === 1 ? "1 voto total" : `${count} votos totales`,
      searchPlaceholder: "Filtrar categoría...",
      viewAllCharts: "Ver panel completo de la comunidad",
    },
    genres: {
      "Ação / Aventura": "Acción / Aventura",
      "Mundo Aberto": "Mundo Abierto",
      Ação: "Acción",
      "Survival Horror": "Survival Horror",
      Direção: "Dirección",
      Narrativa: "Narrativa",
      "Direção de Arte": "Dirección de Arte",
      "Trilha Sonora": "Banda Sonora",
      Áudio: "Audio",
      Atuação: "Actuación",
      Impacto: "Impacto",
      Acessibilidade: "Accesibilidad",
      "Em Andamento": "En Curso",
      Comunidade: "Comunidad",
      Independente: "Independiente",
      "Indie de Estreia": "Indie Debut",
      Mobile: "Móvil",
      "VR / AR": "VR / AR",
      RPG: "RPG",
      Luta: "Lucha",
      Família: "Familiar",
      "Sim / Estratégia": "Sim / Estrategia",
      Simulação: "Simulación",
      Estratégia: "Estrategia",
      "Estratégia Tática": "Estrategia Táctica",
      Esportes: "Deportes",
      Corrida: "Carreras",
      Multiplayer: "Multijugador",
      "Série Animada": "Serie Animada",
      Série: "Serie",
      Filme: "Película",
      "Filme Animado": "Película Animada",
      "Criação da Comunidade": "Creación de Usuario",
      "Streamer / Criador": "Creador de Contenido",
      "Criador de Conteúdo": "Creador de Contenido",
      "Atleta de Esports": "Atleta de Esports",
      Esports: "Esports",
      "Time de Esports": "Equipo de Esports",
      "Mais Aguardado": "Más Esperado",
    },
    years: {
      Contínuo: "En curso",
      "Em breve": "Próximamente",
    },
  },

  ru: {
    htmlLang: "ru",
    pageTitle: "Ecológica Awards — Голосование сообщества",
    brandSubtitle: "Сообщество Ecológica Verde",
    nav: {
      categories: "Категории",
      vote: "Голосование",
      community: "Сообщество",
      results: "Мои результаты",
      editProfileTooltip: "Изменить аватар и имя",
      languageLabel: "Язык",
    },
    defaultUsername: "Изменить_Имя",
    hero: {
      badge: "Премия сообщества Ecológica Verde • Выпуск 2026",
      description:
        "Выберите лучших в каждой номинации, отдайте свой голос в сообществе Ecológica Verde и создайте официальную карточку результатов для публикации.",
      startVoting: "Начать голосование",
      reviewCategories: "Просмотреть категории",
      continueVoting: "Продолжить голосование",
      viewResults: "Мои результаты",
    },
    identityBar: {
      label: "Профиль для итоговой карточки",
      changeAvatar: "Сменить аватар",
      uploadAvatar: "Загрузить аватар",
      avatarButtonTitle: "Изменить изображение аватара",
      progressTitle: "Прогресс голосования",
      allVoted: "Все категории проголосованы",
      remainingOne: "Осталась 1 категория",
      remainingMany: (count) => `Осталось категорий: ${count}`,
      savedLocally: "Сохранено автоматически",
    },
    categoriesSection: {
      eyebrow: "Официальные номинации",
      heading: "Выберите номинацию и проголосуйте",
      searchPlaceholder: "Поиск категории или номинанта...",
      filterAll: "Все",
      filterPending: "Ожидают",
      filterVoted: "Готово",
      emptySearchTitle: "Категории или номинанты не найдены.",
      emptySearchDesc: "Попробуйте другой запрос или очистите фильтр.",
      clearSearch: "Сбросить поиск",
      emptyPendingTitle: "Вы проголосовали во всех категориях!",
      emptyPendingDesc:
        "Ваша официальная карточка готова к сохранению и публикации.",
      openResults: "Открыть результаты",
      emptyVotedTitle: "Вы еще не проголосовали.",
      emptyVotedDesc: "Выберите категорию, чтобы начать голосование.",
      showAll: "Показать все категории",
    },
    categoryCard: {
      catPrefix: "КАТ.",
      featured: "Главная",
      voted: "Выбрано",
      nomineesCount: (count) => `Номинантов: ${count}`,
      yourPick: "Ваш выбор",
      change: "Изменить",
      openAndVote: "Открыть и проголосовать",
    },
    voting: {
      allCategories: "Все категории",
      votedOf: (voted, total) => `${voted} из ${total} выбрано`,
      results: "Результаты",
      categoryStep: (num, total) => `КАТЕГОРИЯ ${num} ИЗ ${total}`,
      featured: "Главная",
      prev: "Назад",
      next: "Далее",
      finish: "Завершить",
      yourVoteInCategory: "Ваш голос в этой категории:",
      hoverPrompt:
        "Наведите на карточку и нажмите на фаворита, чтобы отдать голос.",
      nextCategory: "Следующая категория",
      viewBallotCard: "Открыть карточку результатов",
      voteRecorded: "Голос учтён",
      selectNominee: "Выбрать номинанта",
    },
    results: {
      backToCategories: "Категории",
      profile: "Профиль",
      downloadPng: "Скачать PNG",
      generating: "Создание...",
      pngSuccess: "Карточка сохранена в PNG с прозрачным фоном.",
      pngError:
        "Не удалось создать изображение (проверьте CORS для URL аватара или загрузите фото с устройства).",
      incompletePrompt: (voted, total, remaining) =>
        `Выбрано ${voted} из ${total} категорий. Можно скачать сейчас или заполнить оставшиеся (${remaining}).`,
      voteNextPending: "К следующей категории",
      officialCard: (edition) => `Официальная карточка • ${edition}`,
      votesBy: "Голоса",
      categoriesCount: (voted, total) => `${voted}/${total} категорий`,
      notSelectedYet: "Ещё не выбрано",
      clickToChooseGoty: "Нажмите, чтобы выбрать Игру года",
      changeVote: "Изменить",
      vote: "Голосовать",
      noVote: "Нет голоса",
      clickToVote: "Нажмите, чтобы выбрать",
      footerHint:
        "Совет: нажмите на любую категорию на карточке выше, чтобы сразу изменить выбор.",
      clearAllVotes: "Сбросить все голоса",
      confirmResetTitle: "Сбросить все голоса?",
      confirmResetDesc:
        "Все выбранные номинанты в этом браузере будут удалены. Ваш аватар и имя пользователя сохранятся.",
      cancel: "Отмена",
      confirmClear: "Подтвердить сброс",
    },
    profileDialog: {
      title: "Профиль пользователя",
      description:
        "Настройте аватар и имя пользователя для вашей официальной карточки Ecológica Awards.",
      avatarImage: "Изображение аватара",
      uploadPhoto: "Загрузить фото",
      urlButton: "URL",
      apply: "Применить",
      urlPlaceholder: "https://example.com/avatar.png",
      invalidImageType: "Загрузите файл изображения (PNG, JPG или WEBP).",
      invalidImageProcess: "Не удалось обработать изображение.",
      usernameLabel: "Имя в сообществе",
      savedNote:
        "Сохраняется только в вашем браузере для создания итоговой карточки.",
      cancel: "Отмена",
      save: "Сохранить",
      close: "Закрыть",
    },
    footer: {
      communityAwards: "Премия сообщества Ecológica Verde",
      voterProfile: "Профиль пользователя",
    },
    toasts: {
      voteRecorded: (title) => `Голос учтён: ${title}`,
      votesCleared: "Все голоса сброшены.",
      profileUpdated: "Профиль обновлён.",
    },
    audio: {
      label: "Музыка",
      play: "Включить музыку",
      pause: "Пауза",
      mute: "Без звука",
      unmute: "Включить звук",
      volume: "Громкость музыки",
      clickToEnable: "Нажмите, чтобы включить звук",
    },
    community: {
      eyebrow: "Общие итоги",
      title: "Графики сообщества",
      subtitle:
        "Следите за лидерами и распределением голосов в реальном времени. Чтобы не влиять на выбор, каждая категория открывается только после вашего голоса.",
      tabLeaders: "Лидеры",
      tabByCategory: "По категориям",
      refresh: "Обновить",
      refreshing: "Обновление...",
      participants: "Участники",
      totalVotes: "Всего голосов",
      unlocked: "Открыто категорий",
      liveMode: "Официальный подсчёт активен",
      antiBiasBanner:
        "Чтобы не влиять на голосующих, результаты каждой категории скрыты до того, как вы отдадите свой голос.",
      startVotingCta: "Перейти к голосованию",
      lockedTitle: "Результат скрыт",
      lockedDesc: "Проголосуйте в этой категории, чтобы открыть график.",
      voteToUnlock: "Голосовать и открыть",
      leaderBadge: "Лидер",
      yourVoteBadge: "Ваш голос",
      tiedBadge: "Ничья за 1-е место",
      noVotesYet: "Пока нет голосов",
      votesCount: (count) => `${count}`,
      categoryPartialTitle: "Результаты сообщества в этой категории",
      categoryTotalVotes: (count) => `Всего голосов: ${count}`,
      searchPlaceholder: "Поиск категории...",
      viewAllCharts: "Открыть все графики сообщества",
    },
    genres: {
      "Ação / Aventura": "Экшен / Приключения",
      "Mundo Aberto": "Открытый мир",
      Ação: "Экшен",
      "Survival Horror": "Хоррор на выживание",
      Direção: "Режиссура",
      Narrativa: "Сюжет",
      "Direção de Arte": "Арт-дирекшн",
      "Trilha Sonora": "Саундтрек",
      Áudio: "Звук",
      Atuação: "Актёрская игра",
      Impacto: "Влияние",
      Acessibilidade: "Доступность",
      "Em Andamento": "Поддержка",
      Comunidade: "Сообщество",
      Independente: "Инди",
      "Indie de Estreia": "Инди-дебют",
      Mobile: "Мобильная",
      "VR / AR": "VR / AR",
      RPG: "RPG",
      Luta: "Файтинг",
      Família: "Семейная",
      "Sim / Estratégia": "Симулятор / Стратегия",
      Simulação: "Симулятор",
      Estratégia: "Стратегия",
      "Estratégia Tática": "Тактическая стратегия",
      Esportes: "Спорт",
      Corrida: "Гонки",
      Multiplayer: "Мультиплеер",
      "Série Animada": "Анимационный сериал",
      Série: "Сериал",
      Filme: "Фильм",
      "Filme Animado": "Анимационный фильм",
      "Criação da Comunidade": "Творчество игроков",
      "Streamer / Criador": "Контент-мейкер",
      "Criador de Conteúdo": "Контент-мейкер",
      "Atleta de Esports": "Киберспортсмен",
      Esports: "Киберспорт",
      "Time de Esports": "Киберспорт-команда",
      "Mais Aguardado": "Самая ожидаемая",
    },
    years: {
      Contínuo: "Развивается",
      "Em breve": "Скоро",
    },
  },
};
