const fetchData = () => {
  return fetch('../data/contents.json')
    .then((resp) => resp.json())
    .then((json) => json.items);
};

const onButtonClick = (event, items) => {
  const dataset = event.target.dataset;
  const key = dataset.key;
  const value = dataset.value;

  if (key == null) return;

  items.forEach((item) => {
    if (item.dataset[key] === value || item.dataset[key] == 'all') {
      item.classList.remove('invisible');
    } else {
      item.classList.add('invisible');
    }
  });
};

const setEventListener = (items) => {
  const logo = document.querySelector('.logo');
  const buttons = document.querySelector('.buttons');
  logo.addEventListener('click', (event) => onButtonClick(event, items));
  buttons.addEventListener('click', (event) => onButtonClick(event, items));
};

const createElement = (item) => {
  const img = document.createElement('img');
  img.setAttribute('class', 'item-thumnail');
  img.setAttribute('src', item.image);

  const span = document.createElement('span');
  span.setAttribute('class', 'item-desc');
  span.innerText = `${item.gender}, ${item.size} size`;

  const li = document.createElement('li');
  li.setAttribute('class', 'item');
  li.setAttribute('data-type', item.type);
  li.setAttribute('data-color', item.color);
  li.appendChild(img);
  li.appendChild(span);
  return li;
};

// main
fetchData().then((items) => {
  const elements = items.map(createElement);
  const container = document.querySelector('.items');
  container.append(...elements);
  setEventListener(elements);
});
