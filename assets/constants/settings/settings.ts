const settingsConfigs = [
  {
    name: "account",
    items: [
      {
        name: "account",
        description: "accountSettingsDescription",
        icon: "badge-account",
        route: "(account)"
      }
    ]
  },
  {
    name: "language",
    items: [
      {
        name: "language",
        description: "languageSettingsDescription",
        icon: "translate",
        route: "language"
      }
    ]
  },
  {
    name: "notifications",
    items: [
      {
        name: "notifications",
        description: "notificationSettingsDescription",
        icon: "bell-badge-outline",
        route: "notification"
      }
    ]
  },
  {
    name: "Djangii",
    items: [
      {
        name: "lexicon",
        description: "lexiconSettingsDescription",
        icon: "book-information-variant",
        route: "lexicon"
      },
      {
        name: "contactUs",
        description: "contactUsSettingsDescription",
        icon: "message-badge-outline",
        route: "contactUs"
      }
    ]
  }
]

export default settingsConfigs
