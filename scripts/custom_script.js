/* 🚨 IMPORTANT: In the constant DIRECTORY_DATA is where we define the models that are shown inside the web page */

/* 🚨 EXAMPLE: 

{
        id: 0, --------------------------------------> 🚨 It has to be incremental (0,1,2,3,.....,N)
        title: 'Nike Shoes', ------------------------> 🚨 If possible, it is better not to use words with over 10 letters
        imageUrl: 'shoes', --------------------------> 🚨 Only the first word of PNG file
        size: 'large-text', -------------------------> 🚨 Define what type of title it has -> (

            Dress -> Less than 5 letters -> size: '' or do not add it
            Swimsuit -> Over 6 letters -> size: 'large-text'
            Uncrustables -> Over 8 letters -> size: 'extra-large-text'
            Pipe Ensamble -> Over 10 letters -> size: 'extra-extra-large-text'

        ) 
        linkUrl: 'nikeshoes/NikeShoe1.gltf', --------> 🚨 Only the folder name inside 'Models' folder and the file name
        iosUrl: 'nikeshoes/NikeShoe1.usdz', ---------> 🚨 Only the folder name inside 'Models' folder and the file name
    },

*/

const DIRECTORY_DATA = [
    {
        id: 0,
        title: 'Nike Shoes',
        imageUrl: 'shoes',
        size: 'large-text',
        linkUrl: 'nikeshoes/NikeShoe1.gltf',
        iosUrl: 'nikeshoes/NikeShoe1.usdz',
    },
    {
        id: 1,
        title: 'Dress A',
        imageUrl: 'dress1',
        linkUrl: 'clothing/Dress1.gltf',
        iosUrl: 'clothing/Dress1.usdz',
    },
    {
        id: 2,
        title: 'Dress B',
        imageUrl: 'dress2',
        linkUrl: 'clothing/Dress2.gltf',
        iosUrl: 'clothing/Dress2.usdz',
    },
    {
        id: 3,
        title: 'Casual',
        imageUrl: 'casual',
        linkUrl: 'clothing/CasualOutfit.gltf',
        iosUrl: 'clothing/CasualOutfit.usdz',
    },
];

const bodyContainer = document.getElementById('body-container');
const modelContainer = document.getElementById('model-container');
const headerButton = document.getElementById('options');
const defaultModel = document.getElementById('default-model');

const changeIt = (number) => {
    const { id, title, imageUrl, size, linkUrl, iosUrl } = DIRECTORY_DATA[
        number
    ];

    defaultModel.setAttribute('class', 'show');

    const poster = `./assets/Imgs/Posters/${imageUrl}_poster.png`;
    const src = `./assets/Models/${linkUrl}`;
    let ios_src = '';
    if (iosUrl) {
        ios_src = `./assets/Models/${iosUrl}`;
    } else {
        alert(
            `This model is not available for IOS. Instead, the model for Swimsuit B will be shown in case you are using an IOS device.`
        );
        ios_src = './assets/Models/Swimsuits/Swimsuit_B.usdz';
    }
    const alt_comment = `./assets/Models/${title}`;

    console.log(iosUrl);

    const currentModel = document.getElementById('currentModel');
    const buttonContainer = document.getElementById('button-container');

    if (currentModel) {
        currentModel.remove();
    }

    buttonContainer.remove();

    const modelViewer = document.createElement('model-viewer');
    modelViewer.setAttribute('class', 'model');
    modelViewer.setAttribute('id', 'currentModel');
    modelViewer.setAttribute('poster', poster);
    modelViewer.setAttribute('src', src);
    modelViewer.setAttribute('ios-src', ios_src);
    modelViewer.setAttribute('alt', alt_comment);
    modelViewer.setAttribute('shadow-intensity', 1);
    modelViewer.setAttribute('camera-controls', '');
    modelViewer.setAttribute('ar', '');
    modelViewer.setAttribute('auto-rotate', '');
    modelViewer.setAttribute('autoplay', 'true');

    modelContainer.appendChild(modelViewer);

    const modelTitle = document.createElement('h1');
    modelTitle.setAttribute('class', 'title-container');
    modelTitle.textContent = DIRECTORY_DATA[number].title;

    modelContainer.appendChild(modelTitle);

    if (navigator.onLine) {
        defaultModel.setAttribute('class', 'hide');
    }

    headerButton.setAttribute('onclick', `createButtonHandler(${false})`);
    headerButton.querySelector('span').textContent =
        '\xa0\xa0\xa0\xa0BACK\xa0\xa0\xa0\xa0';
};

const createButtons = (number, buttonContainerBase) => {
    // . Defining Color Classes

    const productType = DIRECTORY_DATA[number].linkUrl.split('/')[0];

    let colorClass = '';

    if (productType === 'clothing' || productType === 'nikeshoes') {
        colorClass = 'aqua';
    } else if (productType === 'swimsuits') {
        colorClass = 'blue';
    } else if (productType === 'misc' || productType === 'smuckers') {
        colorClass = 'green';
    } else if (productType === 'pipe') {
        colorClass = 'red';
    } else {
        colorClass = 'aqua';
    }

    // . Creating Button Base Div

    const buttonBase = document.createElement('div');
    const poster = `./assets/Imgs/Posters/${DIRECTORY_DATA[number].imageUrl}_poster.png`;
    let firstChild = '';

    if (number === 0) {
        firstChild = 'first-child';
    }
    buttonBase.setAttribute('class', `menu-item ${firstChild}`);
    buttonBase.setAttribute('onclick', `changeIt(${number})`);

    buttonContainerBase.appendChild(buttonBase);

    // . Creating Background and Content Div

    const buttonBackground = document.createElement('div');
    const buttonContent = document.createElement('div');

    buttonBackground.setAttribute('class', 'background-image');
    buttonBackground.setAttribute('style', `background-image: url(${poster})`);
    buttonContent.setAttribute('class', `${colorClass} content`);

    buttonBase.appendChild(buttonBackground);
    buttonBase.appendChild(buttonContent);

    // . Creating Centered Content Div

    const contentCentered = document.createElement('div');
    contentCentered.setAttribute(
        'class',
        `centered-content ${DIRECTORY_DATA[number].size}`
    );

    buttonContent.appendChild(contentCentered);

    // . Creating Title and Subtitle

    const contentTitle = document.createElement('h1');
    const contentSubtitle = document.createElement('span');

    contentTitle.setAttribute('class', 'title');
    contentTitle.textContent = DIRECTORY_DATA[number].title;

    contentSubtitle.setAttribute('class', `${colorClass} subtitle`);
    contentSubtitle.textContent = 'See it in AR!';

    contentCentered.appendChild(contentTitle);
    contentCentered.appendChild(contentSubtitle);
};

const createButtonHandler = (checkExistance) => {
    const currentTitle = document.querySelector('.title-container');
    const currentModel = document.getElementById('currentModel');

    if (!checkExistance) {
        if (currentModel && currentTitle) {
            currentModel.remove();
            currentTitle.remove();
        }

        const buttonContainerBase = document.createElement('div');
        buttonContainerBase.setAttribute('id', 'button-container');

        bodyContainer.appendChild(buttonContainerBase);

        for (let i = 0; i < DIRECTORY_DATA.length; i++) {
            createButtons(i, buttonContainerBase);
        }

        defaultModel.setAttribute('class', 'hide');
        headerButton.setAttribute('onclick', `createButtonHandler(${true})`);
        headerButton.querySelector('span').textContent = 'PRODUCTS';
    } else {
        return;
    }
};

createButtonHandler(false);

function reload_mv(srcUrlContains, isModule) {
    var scriptsContainer = document.getElementById('model-scripts-container');
    var script = document.createElement('script');

    if (isModule == 0) {
        script.setAttribute('ID', 'modelModule');
        script.setAttribute('type', 'module');
    }
    if (isModule == 1) {
        script.setAttribute('ID', 'modelNoModule');
        script.setAttribute('nomodule', '');
    }
    script.src = srcUrlContains;
    scriptsContainer.appendChild(script);
}
