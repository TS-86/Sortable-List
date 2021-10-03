const draggable_list = document.getElementById('draggable-list');
const check = document.getElementById('check');

const popularChannels = [
    'freeCodeCamp.org',
    'Programming with Mosh',
    'Traversy Media',
    'Fireship',
    'The Net Ninja',
    'LearnCode.academy',
    'Academind',
    'Web Dev Simplified',
    'Codevolution',
    'JSConf'
];

// Store list items
const listItems = [];

let dragStartIndex;

createList();

// Insert list items into DOM
function createList() {
  [...popularChannels]
    .map(a => ({ value: a, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(a => a.value)
    .forEach((channel, index) => {
      //console.log(channel);
      
      const listItem = document.createElement('li');

      listItem.setAttribute('data-index', index);

      listItem.innerHTML = `
        <span class="number">${index +1}</span>
        <div class="draggable" draggable="true">
          <p class="channel-name">${channel}</p>
          <i class="fas fa-grip-lines"></i>
        </div>
      `;

      listItems.push(listItem);

      draggable_list.appendChild(listItem);
    });

    addEventListeners();
}

function dragStart() {
  //console.log('Event: ', 'dragstart');
  dragStartIndex = +this.closest('li').getAttribute('data-index');
  //console.log(dragStartIndex);
}

function dragEnter() {
  //console.log('Event: ', 'dragenter');
  this.classList.add('over');
}

function dragLeave() {
  //console.log('Event: ', 'dragleave');
  this.classList.remove('over');
}

function dragOver(e) {
  //console.log('Event: ', 'dragover');
  e.preventDefault();
}

function dragDrop() {
  //console.log('Event: ', 'drop');
  const dragEndIndex = +this.getAttribute('data-index');
  swapItems(dragStartIndex, dragEndIndex);

  this.classList.remove('over');
}

// Swap list items that are dragged and dropped
function swapItems(fromIndex, toIndex) {
  //console.log('swapped');
  const itemOne = listItems[fromIndex].querySelector('.draggable');
  const itemTwo = listItems[toIndex].querySelector('.draggable');
  //console.log(itemOne, itemTwo);
  listItems[fromIndex].appendChild(itemTwo);
  listItems[toIndex].appendChild(itemOne);
}

// Check the order of list items
function checkOrder() {
  listItems.forEach((listItem, index) => {
    const channelName = listItem.querySelector('.draggable')
    .innerText.trim();

    if(channelName !== popularChannels[index]) {
      listItem.classList.add('wrong');
    } else {
      listItem.classList.remove('wrong');
      listItem.classList.add('right');
    }
  });
}

function addEventListeners() {
  const draggables = document.querySelectorAll('.draggable');
  const dragListItems = document.querySelectorAll('.draggable-list li');

  draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', dragStart);
  });

  dragListItems.forEach(item => {
    item.addEventListener('dragover', dragOver);
    item.addEventListener('drop', dragDrop);
    item.addEventListener('dragenter', dragEnter);
    item.addEventListener('dragleave', dragLeave);
  });
}

check.addEventListener('click', checkOrder);

