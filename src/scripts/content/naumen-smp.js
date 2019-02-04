'use strict';

const extractSubjectUuid = () => {
  const match = window.top.location.hash.match(/#(?:uuid|edit):(\w+\$\d+).*/);
  return match && (match[1] || null);
};

const getDescription = () => {
  const descriptionContainer = $('.MainTabInnerPanel .fixedInnerHeader .g-h1');
  const titleMatch = descriptionContainer.textContent.match(/(^[^"]+$)|"([\S ]+)"/);
  const title = titleMatch && (titleMatch[1] || titleMatch[2] || '');
  const uuid = extractSubjectUuid();
  return `${title} ${uuid ? `(${uuid})` : ''}`;
};

const getThemeCode = () => {
  const themeProperty = $('meta[name="gwt:property"][content^="theme"]').content;
  const themeCode = themeProperty.split('=')[1];
  return themeCode;
};

const renderTogglButton = (togglLink, classNames) => {
  const buttonWrapper = document.createElement('div');
  buttonWrapper.classList.add('naumen-smp-wrapper', ...classNames);
  buttonWrapper.appendChild(togglLink);

  const buttonContainer = document.createElement('td');
  buttonContainer.setAttribute('align', 'left');
  buttonContainer.appendChild(buttonWrapper);

  return buttonContainer;
};

togglbutton.render('.whenFoldedKeepInline+table:not(.toggl)', { observe: true }, root => {
  const themeCode = getThemeCode();
  const classNames = [themeCode];

  const footerVersion = $('#footerVersion');

  if (footerVersion) {
    const versionMatch = footerVersion.textContent.match(/[A-Za-zА-Яа-я]+: ([\d.]+)[\s\S]+/);
    const version = versionMatch && (versionMatch[1] || '');
    const normalizedVersionString = version.substr(0, 4).replace(/[^\d]/g, '');
    const normalizedVersion = parseInt(normalizedVersionString, 10);
    classNames.push('v' + normalizedVersion);
  }

  const link = togglbutton.createTimerLink({
    className: 'naumen-smp',
    description: getDescription(),
    buttonType: 'minimal'
  });
  link.classList.add(...classNames);

  const togglButton = renderTogglButton(link, classNames);
  const buttonsRow = $('tr', root);

  buttonsRow.insertBefore(togglButton, buttonsRow.firstChild);
});
