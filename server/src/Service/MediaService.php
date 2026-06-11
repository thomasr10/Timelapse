<?php

namespace App\Service;

use Doctrine\ORM\EntityManagerInterface;
use App\Entity\User;
use App\Entity\Media;
use App\Repository\MediaRepository;

class MediaService
{
    public function __construct(private MediaRepository $mediaRepository, private EntityManagerInterface $em){}

    public function findOrCreate(int $tmdb, string $type): Media
    {   
        $media_entity;
        $media_entity = $this->mediaRepository->findByTMDBIdAndType($tmdb, $type);

        if (!$media_entity) {
            $media_entity = new Media();
            $media_entity->setTmdbId($tmdb);
            $media_entity->setType($type);
            $media_entity->setCreatedAt(new \DateTimeImmutable());
            $this->em->persist($media_entity);
            $this->em->flush();
        }

        return $media_entity;
    }

    public function findMedia(int $tmdb, string $type): ?Media
    {
        return $this->mediaRepository->findByTMDBIdAndType($tmdb, $type);
    }
}