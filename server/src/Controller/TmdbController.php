<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use App\Service\TmdbService;

#[Route('/api')]
final class TmdbController extends AbstractController
{
    public function __construct(private TmdbService $tmdbService){}

    #[Route('/upcoming-movies', name: 'app_tmdb_upcoming_movies')]
    public function upcomingMovies(): JsonResponse
    {
        $upcoming_movies = $this->tmdbService->fetchUpcomingMovies();

        return $this->json([
            'message' => 'Movies fetched successfully',
            'results' => $upcoming_movies,
        ]);
    }

    #[Route('/movie/genres', name: 'app_movie_genres')]
    public function movieGenres(): JsonResponse
    {
        $movie_genres = $this->tmdbService->fetchMovieGenres();
            
        return $this->json([
            'message' => 'Movie genres fetched successfully',
            'results' => $movie_genres,
        ]);
    }

    #[Route('/tv/genres', name: 'app_tv_genres')]
    public function tvGenres(): JsonResponse
    {
        $tv_genres = $this->tmdbService->fetchTvGenres();
        
        return $this->json([
            'message' => 'Tv genres fetched successfully',
            'results' => $tv_genres,
        ]);
    }

    #[Route('/movie/trending', name: 'app_trending_movies')]
    public function trendingMovies(): JsonResponse
    {
        $trending_movies = $this->tmdbService->fetchTrendingMovies();
        
        return $this->json([
            'message' => 'Trending movies fetched successfully',
            'results' => $trending_movies,
        ]);

    }

    #[Route('/tv/trending', name: 'app_trending_tv')]
    public function trendingTv(): JsonResponse
    {
        $trending_tv = $this->tmdbService->fetchTrendingTv();
        
        return $this->json([
            'message' => 'Trending series fetched successfully',
            'results' => $trending_tv,
        ]);
    }

    #[Route('/tv/airing', name: 'app_airing_tv')]
    public function airingTv(): JsonResponse
    {
        $airing_tv = $this->tmdbService->fetchAiringTv();
        
        return $this->json([
            'message' => 'Airing series fetched successfully',
            'results' => $airing_tv,
        ]);
    }

    #[Route('/details/{type}/{id}', name: 'app_details', requirements: ['type' => 'movie|tv', 'id' => '\d+'])]
    public function fetchDetails(string $type, string $id): JsonResponse
    {
        $details = $this->tmdbService->fetchDetails($type, intval($id));
        
        return $this->json([
            'message' => 'Media details fetched successfully',
            'results' => $details,
        ]);
    }

    #[Route('/credits/{type}/{id}', name: 'app_credits')]
    public function fetchCredits(string $type, string $id): JsonResponse
    {
        $credits = $this->tmdbService->fetchCredits($type, intval($id));
        
        return $this->json([
            'message' => 'Media credits fetched successfully',
            'results' => $credits,
        ]);
    }    

    #[Route('/movie/{search}', name: 'app_search_movie')]
    public function searchMovies(string $search): JsonResponse
    {
        $movie = $this->tmdbService->searchMovies($search);
        
        return $this->json([
            'message' => 'Movie fetched successfully',
            'results' => $movie,
        ]);
    } 

    #[Route('/tv/{search}', name: 'app_search_movie')]
    public function searchTv(string $search): JsonResponse
    {
        $series = $this->tmdbService->searchTv($search);
        
        return $this->json([
            'message' => 'Series fetched successfully',
            'results' => $series,
        ]);
    }

    #[Route('/cast/{search}', name: 'app_search_cast')]
    public function searchCast(string $search): JsonResponse
    {
        $cast = $this->tmdbService->searchCast($search);
        
        return $this->json([
            'message' => 'Cast fetched successfully',
            'results' => $cast,
        ]);
    }    
}
