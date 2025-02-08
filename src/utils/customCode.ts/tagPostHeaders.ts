const gen = (title: string, url: string, icon: string) => {
  return {
    title,
    url,
    icon,
  };
};

export const tagPostHeaders = {
  tdd: gen('This is part of test first series', '/tdd', 'info'),
};
