const getTitle = (
  v?: { title_fr?: string; title_en?: string },
  language?: string,
) => {
  let r = '';
  if (language === 'fr') {
    r = v?.title_fr || v?.title_en || '';
  } else {
    r = v?.title_en || v?.title_fr || '';
  }
  return r;
};

export default getTitle;
