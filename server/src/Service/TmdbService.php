<?php

namespace App\Service;

use Symfony\Contracts\HttpClient\HttpClientInterface;

class TmdbService
{
    public function __construct(
        private HttpClientInterface $httpClient,
        private string $tmdbBaseUrl,
        private string $tmdbApiKey,
        private string $tmdbRegion,
        private string $tmdbLanguage,
    ) {
    }

    public function fetchUpcomingMovies(): array
    {
        $response = $this->httpClient->request('GET', $this->tmdbBaseUrl . '/movie/upcoming', [
            'auth_bearer' => $this->tmdbApiKey,
            'headers' => ['Accept' => 'application/json'],
            'query' => [
                'region' => $this->tmdbRegion,
                'language' => $this->tmdbLanguage,
                'page' => 1,
            ],
        ]);

        return $response->toArray();
    }

    public function fetchTrendingMovies(): array
    {
        $response = $this->httpClient->request('GET', $this->tmdbBaseUrl . '/trending/movie/week', [
            'auth_bearer' => $this->tmdbApiKey,
            'headers' => ['Accept' => 'application/json'],
            'query' => [
                'language' => $this->tmdbLanguage,
            ],
        ]);

        return $response->toArray();
    }

    public function fetchMovieGenres(): array
    {
        $response = $this->httpClient->request('GET', $this->tmdbBaseUrl . '/genre/movie/list', [
            'auth_bearer' => $this->tmdbApiKey,
            'headers' => ['Accept' => 'application/json'],
            'query' => [
                'language' => $this->tmdbLanguage,
            ],
        ]);

        return $response->toArray();
    }

    public function fetchTvGenres(): array
    {
        $response = $this->httpClient->request('GET', $this->tmdbBaseUrl . '/genre/tv/list', [
            'auth_bearer' => $this->tmdbApiKey,
            'headers' => ['Accept' => 'application/json'],
            'query' => [
                'language' => $this->tmdbLanguage,
            ],
        ]);

        return $response->toArray();
    }

    public function fetchTrendingTv(): array
    {
        $response = $this->httpClient->request('GET', $this->tmdbBaseUrl . '/trending/tv/week', [
            'auth_bearer' => $this->tmdbApiKey,
            'headers' => ['Accept' => 'application/json'],
            'query' => [
                'language' => $this->tmdbLanguage,
            ],
        ]);

        return $response->toArray();
    }

    public function fetchAiringTv(): array
    {
        $response = $this->httpClient->request('GET', $this->tmdbBaseUrl . '/discover/tv', [
            'auth_bearer' => $this->tmdbApiKey,
            'headers' => ['Accept' => 'application/json'],
            'query' => [
                'language' => $this->tmdbLanguage,
                'sort_by' => 'popularity.desc',
                'with_status' => 0,
                'page' => 1,
            ],
        ]);

        return $response->toArray();
    }

    public function fetchDetails(string $type, int $id): array
    {
        if (!in_array($type, ['movie', 'tv'], true)) {
            throw new \InvalidArgumentException('Type must be "movie" or "tv".');
        }

        $response = $this->httpClient->request('GET', $this->tmdbBaseUrl . '/' . $type . '/' . $id, [
            'auth_bearer' => $this->tmdbApiKey,
            'headers' => ['Accept' => 'application/json'],
            'query' => [
                'language' => $this->tmdbLanguage,
                'region' => $this->tmdbRegion,
            ],
        ]);

        return $response->toArray();
    }

    public function fetchCredits(string $type, int $id): array
    {
        if (!in_array($type, ['movie', 'tv'], true)) {
            throw new \InvalidArgumentException('Type must be "movie" or "tv".');
        }

        $response = $this->httpClient->request('GET', $this->tmdbBaseUrl . '/' . $type . '/' . $id . '/credits', [
            'auth_bearer' => $this->tmdbApiKey,
            'headers' => ['Accept' => 'application/json'],
            'query' => [
                'language' => $this->tmdbLanguage,
            ],
        ]);

        return $response->toArray();
    }

    public function searchMovies(string $query): array
    {
        $response = $this->httpClient->request('GET', $this->tmdbBaseUrl . '/search/movie', [
            'auth_bearer' => $this->tmdbApiKey,
            'headers' => ['Accept' => 'application/json'],
            'query' => [
                'query' => $query,
                'language' => $this->tmdbLanguage,
            ],
        ]);

        return $response->toArray();
    }

    public function searchTv(string $query): array
    {
        $response = $this->httpClient->request('GET', $this->tmdbBaseUrl . '/search/tv', [
            'auth_bearer' => $this->tmdbApiKey,
            'headers' => ['Accept' => 'application/json'],
            'query' => [
                'query' => $query,
                'language' => $this->tmdbLanguage,
            ],
        ]);

        return $response->toArray();
    }

    public function searchCast(string $query): array
    {
        $response = $this->httpClient->request('GET', $this->tmdbBaseUrl . '/search/person', [
            'auth_bearer' => $this->tmdbApiKey,
            'headers' => ['Accept' => 'application/json'],
            'query' => [
                'query' => $query,
                'language' => $this->tmdbLanguage,
            ],
        ]);

        return $response->toArray();
    }
}