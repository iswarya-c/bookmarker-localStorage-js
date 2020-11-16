// SELECTORS
const submitBtn = document.querySelector('.submitBtn');
const output = document.querySelector('.output');
const inputSite = document.querySelector('.inputSite');
const inputUrl = document.querySelector('.inputUrl');
// EVENT LISTENERS
submitBtn.addEventListener('click', addUrl);
output.addEventListener('click', deleteSite);
document.addEventListener('DOMContentLoaded', createLocalElem);

// FUNCTIONS
function addUrl(event) {
  event.preventDefault;
  const strName = document.querySelector('.inputSite').value;
  const strUrl = document.querySelector('.inputUrl').value;
  if (strUrl == '' || strName == '') {
    return;
  }

  //   CREATE SITE DIV
  const siteDiv = document.createElement('div');
  siteDiv.classList.add('site-div');

  //   CREATE SITE NAME
  const siteName = document.createElement('p');
  siteName.classList.add('site-p');
  siteName.innerText = strName;
  siteDiv.appendChild(siteName);
  savetoLocal({ name: strName, url: strUrl });

  // CREATE VISIT BTN
  const visit = document.createElement('a');
  visit.classList.add('visit-btn');
  visit.classList.add('site-btn');
  visit.innerText = 'Visit';
  siteDiv.appendChild(visit);
  visit.target = '_blank';

  visit.href = strUrl;

  // CREATE TRASH BTN
  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('delete-btn');
  deleteBtn.innerText = 'Delete';
  siteDiv.appendChild(deleteBtn);
  deleteBtn.classList.add('site-btn');
  output.appendChild(siteDiv);
  inputSite.value = '';
  inputUrl.value = '';
}

// DELETE
function deleteSite(event) {
  const site = event.target;
  if (site.classList.contains('delete-btn')) {
    const toDelete = site.parentElement;
    // console.log(toDelete.children[0].innerText);
    deleteFromLocal(toDelete.children[0].innerText);
    toDelete.remove();
  }
}

// LOCALSTORAGE - STORE
function savetoLocal(obj) {
  let site;
  if (localStorage.getItem('site') == null) {
    site = [];
  } else {
    site = JSON.parse(localStorage.getItem('site'));
  }
  site.push(obj);
  console.log(site);
  localStorage.setItem('site', JSON.stringify(site));
}

// LOCAL STORAGE - CREATE

function createLocalElem() {
  let site;
  if (localStorage.getItem('site') == null) {
    site = [];
  } else {
    site = JSON.parse(localStorage.getItem('site'));
  }
  site.forEach((item) => {
    const siteDiv = document.createElement('div');
    siteDiv.classList.add('site-div');

    //   CREATE SITE NAME
    const siteName = document.createElement('p');
    siteName.classList.add('site-p');
    siteName.innerText = item.name;
    siteDiv.appendChild(siteName);

    // CREATE VISIT BTN
    const visit = document.createElement('a');
    visit.classList.add('visit-btn');
    visit.innerText = 'Visit';
    siteDiv.appendChild(visit);
    visit.target = '_blank';

    visit.href = item.url;
    visit.preventDefault;
    // CREATE TRASH BTN
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.innerText = 'Delete';
    siteDiv.appendChild(deleteBtn);

    output.appendChild(siteDiv);
  });
}

// LOCAL STORAGE - DELETE

function deleteFromLocal(str) {
  let site;
  if (localStorage.getItem('site') == null) {
    site = [];
  } else {
    site = JSON.parse(localStorage.getItem('site'));
  }
  site.forEach((item) => {
    const pos = site.indexOf(item);
    if (item.name == str) {
      site.splice(pos, 1);
    }
  });
  localStorage.setItem('site', JSON.stringify(site));
}
