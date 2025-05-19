import './bootstrap.js';
/*
 * Welcome to your app's main JavaScript file!
 *
 * This file will be included onto the page via the importmap() Twig function,
 * which should already be in your base.html.twig.
 */
import './styles/app.css';

console.log('This log comes from assets/app.js - welcome to AssetMapper! 🎉');

document.addEventListener('DOMContentLoaded', () => {
    const btnAjouter = document.getElementById("btn_ajouter");
    
    if (btnAjouter) {
        btnAjouter.addEventListener("click", (e) => {
            e.preventDefault(); // Empêcher le comportement par défaut du lien
            const modal = document.createElement('div');
            modal.className = 'fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center';
            modal.innerHTML = `
                <div class="relative bg-white rounded-lg shadow-xl p-8 m-4 max-w 2xl w-full md:w-1/2">
                    <h2 class="text-2xl font-bold mb-4">Nouvelle Tâche</h2>
                    <form id="taskForm" class="space-y-4">
                        <div>
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="taskTitle">
                                Titre
                            </label>
                            <input type="text" id="taskTitle" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                        </div>
                        <div>
                            <label class="block text-gray-700 text-sm font-bold mb-2" for="taskDescription">
                                Description
                            </label>
                            <textarea id="taskDescription" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" rows="3"></textarea>
                        </div>
                        <div class="flex justify-end space-x-4">
                            <button type="button" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded" id="cancelTask">
                                Annuler
                            </button>
                            <button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Ajouter
                            </button>
                        </div>
                    </form>
                </div>
            `;
            
            document.body.appendChild(modal);
            
            // Gestionnaire pour fermer la modale
            const cancelButton = modal.querySelector('#cancelTask');
            cancelButton.addEventListener('click', () => {
                modal.remove();
            });
            
            // Gestionnaire pour le formulaire
            const form = modal.querySelector('#taskForm');
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const title = document.getElementById('taskTitle').value;
                const description = document.getElementById('taskDescription').value;
                
                // TODO: Envoyer les données au serveur
                console.log('Nouvelle tâche:', { title, description });
                
                // Fermer la modale
                modal.remove();
            });
            
            // Fermer la modale en cliquant en dehors
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.remove();
                }
            });
        });
    }
});