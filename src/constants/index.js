const constants = {
  brandInfo: {
    brandName: 'MakerX',
    brandLink: 'https://makerx.com.au/',
    brandLinkName: 'makerx.com.au',
    brandLinkColour: '#003FB5',
    brandLogo: {
      link: 'https://makerxsignatures.blob.core.windows.net/images/MakerX-Full-Logo-Black.jpg',
      alt: 'MakerX',
    },
    brandGPTWLogo: {
      link: 'https://makerxsignatures.blob.core.windows.net/images/GPTW-Best-Workplaces-Current.png',
      alt: 'MakerX Best Workplaces',
    },
  },

  placeholders: {
    name: 'Your Name',
    pronoun: 'he/him | she/her | they/them',
    title: 'Job Title',
    email: 'your.name@makerx.com.au',
    mobile: '+61 111 222 333',
    twitter: 'myTwitterHandle',
    qualifications: 'Jedi Master | PSM I',
    supportHotline: '1800 xyz xyz',
    supportEmail: 'support@some.domain',
  },

  default: {
    countryCode: '+61',
  },

  holidayThemes: {
    none: { label: 'None', prefix: '', suffix: '' },
    christmas: { label: 'Christmas', prefix: '🎄 ', suffix: ' ❄️' },
    halloween: { label: 'Halloween', prefix: '🎃 ', suffix: ' 👻' },
    easter: { label: 'Easter', prefix: '🐰 ', suffix: ' 🥚' },
    valentines: { label: "Valentine's Day", prefix: '❤️ ', suffix: ' 💕' },
    newYear: { label: 'New Year', prefix: '🎉 ', suffix: ' ✨' },
  },
};

export default constants;
