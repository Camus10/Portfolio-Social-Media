import React from 'react';
import { useParams } from 'react-router-dom';


const generatePage = (pageName) => {
  const component = () => require(`./pages/${pageName}`).default;
  return React.createElement(component());
}

export const PageRender = () => {
  const { page, id } = useParams();
  let pageName = '';
  if(id){
    pageName = `${page}/[id]`;
  }else{
    pageName = `${page}`;
  }

  return generatePage(pageName);
};
