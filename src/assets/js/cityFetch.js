// Fonction pour effectuer la requête API et mettre à jour la liste déroulante des villes
export async function fetchCitiesByPostalCode(postalCode) {
    if (!postalCode || postalCode.trim().length !== 5) return [];

    try {
        const response = await fetch(`https://apicarto.ign.fr/api/codes-postaux/communes/${postalCode}`);
        const data = await response.json();
        return data.map(city => city.nomCommune);
    } catch (error) {
        console.error("Erreur de récupération des villes :", error);
        return [];
    }
}

// Fonction pour initialiser les gestionnaires d'événements code postal
function initializeEventHandlers() {
    const postalCodeInput = document.getElementById('postal-code');
    const citySelect = document.getElementById('city');
    // Ajouter un gestionnaire d'événement pour le changement de code postal
    postalCodeInput.addEventListener('input', () => {
        updateCityList(postalCodeInput, citySelect);
    });
}
