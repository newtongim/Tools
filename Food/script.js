const nationalities = [
    "Thai",
    "Korean",
    "Japanese",
    "Chinese",
    "Italian",
    "Mexican",
    "Indian",
    "French",
    "American",
    "Mediterranean"
];

const foodTypes = [
    "Salad",
    "One Dish",
    "Buffet",
    "Grilled",
    "Soup",
    "Stir-Fry",
    "Pasta",
    "Pizza",
    "Sandwich",
    "Dessert"
];

function createInputGroups(items, containerId) {
    const container = document.getElementById(containerId);
    items.forEach(item => {
        const inputGroup = document.createElement('div');
        inputGroup.className = 'input-group';
        const label = document.createElement('label');
        label.innerText = item;
        const input = document.createElement('input');
        input.type = 'number';
        input.value = 1;
        input.min = 1;
        input.dataset.item = item;
        inputGroup.appendChild(label);
        inputGroup.appendChild(input);
        container.appendChild(inputGroup);
    });
}

function getWeightedRandom(items) {
    const weights = items.map(item => parseInt(item.weight));
    const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
    const randomNum = Math.floor(Math.random() * totalWeight);

    let cumulativeWeight = 0;
    for (let i = 0; i < items.length; i++) {
        cumulativeWeight += weights[i];
        if (randomNum < cumulativeWeight) {
            return items[i].name;
        }
    }
}

function generateFoodChoice() {
    const nationalityInputs = document.querySelectorAll('#food-choices-container .input-group input');
    const foodTypeInputs = document.querySelectorAll('#food-types-container .input-group input');

    const nationalities = Array.from(nationalityInputs).map(input => ({
        name: input.dataset.item,
        weight: input.value
    }));
    const foodTypes = Array.from(foodTypeInputs).map(input => ({
        name: input.dataset.item,
        weight: input.value
    }));

    const nationality = getWeightedRandom(nationalities);
    const foodType = getWeightedRandom(foodTypes);
    const foodChoice = `${nationality} ${foodType}`;

    document.getElementById('food-choice').innerText = foodChoice;
}

document.getElementById('generate-btn').addEventListener('click', generateFoodChoice);

createInputGroups(nationalities, 'food-choices-container');
createInputGroups(foodTypes, 'food-types-container');
