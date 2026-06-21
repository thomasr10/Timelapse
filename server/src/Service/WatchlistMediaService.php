<?php

namespace App\Service;

use Doctrine\DBAL\Connection;

class WatchlistMediaService
{   
    public function __construct(private Connection $connection){}

    public function addMedia(int $media_id, int $watchlist_id)
    {   
        // Vérifier si relation existe déjà
        $exists = $this->connection->fetchOne(
            'SELECT 1 FROM watchlist_media WHERE watchlist_id = ? AND media_id = ?',
            [$watchlist_id, $media_id]
        );

        if ($exists) {
            return "Le media existe déjà dans cette watchlist";
        }

        $this->connection->insert('watchlist_media', [
            'watchlist_id' => $watchlist_id,
            'media_id' => $media_id
        ]);
        
    }

    public function deleteMedia(int $media_id, int $watchlist_id)
    {
        $this->connection->delete('watchlist_media', [
            'watchlist_id' => $watchlist_id,
            'media_id' => $media_id
        ]);
        
    }
}