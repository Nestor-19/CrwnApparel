import DirectoryItem from '../DirectoryItem/DirectoryItem';

import './Directory.styles.scss'

const categories = [
  {
    id: 1,
    title: 'hats',
    imageUrl: 'https://3.bp.blogspot.com/-n5xdaceZdHA/Tfb4NsyuZGI/AAAAAAAAABo/9HIbE74sLR4/s1600/snap+hats2.jpg',
    route: 'shop/hats'
  },
  {
    id: 2,
    title: 'jackets',
    imageUrl: 'https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2017%2F10%2Fevent-recap-readymade-maxfield-la-pop-up-23.jpg?cbr=1&q=90',
    route: 'shop/jackets'
  },
  {
    id: 3,
    title: 'sneakers',
    imageUrl: 'https://weartesters.com/wp-content/uploads/2021/11/IMG_8146-1024x768.jpg',
    route: 'shop/sneakers'
  },
  {
    id: 4,
    title: 'womens',
    imageUrl: 'https://www.shutterstock.com/image-photo/beauty-styled-portrait-young-black-600nw-2110212626.jpg',
    route: 'shop/womens'
  },
  {
    id: 5,
    title: 'mens',
    imageUrl: 'https://www.thefashionisto.com/wp-content/uploads/2018/11/Express-Men-Fall-2018-009-750x420.jpg',
    route: 'shop/mens'
  },
];

const Directory = () => {
  return (
    <div className='directory-container'>
      {categories.map((category) => (
        <DirectoryItem key={category.id} category={category} />
      ))}
    </div>
  );
};

export default Directory;
