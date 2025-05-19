<?php

namespace App\Controller;

use App\Entity\Task;
use App\Repository\TaskRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/')]
final class HomeController extends AbstractController
{
    private TaskRepository $taskRepository;

    public function __construct(TaskRepository $taskRepository)
    {
        $this->taskRepository = $taskRepository;
    }


    // tous les tasks

    #[Route('/', name: 'app_home', methods: ['GET'])]
    public function index(): Response
    {
        $tasks = $this->taskRepository->findAllOrderedByCreatedAt();
        
        return $this->render('home/index.html.twig', [
            'tasks' => $tasks
        ]);
    }

    // creer une task

    #[Route('/task/create', name: 'app_task_create', methods: ['GET', 'POST'])]
    public function create(Request $request): Response
    {
        // dd($request->request->all());
        if ($request->isMethod('POST')) {
            $task = new Task();
            $task->setName($request->request->get('name'));
            $task->setDescription($request->request->get('description'));
            
            try {
                $this->taskRepository->save($task);
                $this->addFlash('success', 'Tâche créée avec succès');
                return $this->redirectToRoute('app_home');
            } catch (\Exception $e) {
                $this->addFlash('error', 'Erreur lors de la création de la tâche');
            }
        }
        
        return $this->render('home/create.html.twig');
    }

    #[Route('/task/{id}/edit', name: 'app_task_edit', methods: ['GET', 'POST'])]
    public function edit(int $id, Request $request): Response
    {
        $task = $this->taskRepository->find($id);
        
        if (!$task) {
            throw $this->createNotFoundException('Tâche non trouvée');
        }

        if ($request->isMethod('POST')) {
            $task->setName($request->request->get('name'));
            $task->setDescription($request->request->get('description'));
            $task->updateTimestamp();
            
            try {
                $this->taskRepository->save($task);
                $this->addFlash('success', 'Tâche mise à jour avec succès');
                return $this->redirectToRoute('app_home');
            } catch (\Exception $e) {
                $this->addFlash('error', 'Erreur lors de la mise à jour de la tâche');
            }
        }
        
        return $this->render('home/edit.html.twig', [
            'task' => $task
        ]);
    }

    #[Route('/task/{id}/delete', name: 'app_task_delete', methods: ['POST'])]
    public function delete(int $id): Response
    {
        $task = $this->taskRepository->find($id);
        
        if (!$task) {
            throw $this->createNotFoundException('Tâche non trouvée');
        }

        try {
            $this->taskRepository->remove($task);
            $this->addFlash('success', 'Tâche supprimée avec succès');
        } catch (\Exception $e) {
            $this->addFlash('error', 'Erreur lors de la suppression de la tâche');
        }

        return $this->redirectToRoute('app_home');
    }
}
