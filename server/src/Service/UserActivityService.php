<?php

namespace App\Service;

use App\Entity\User;
use App\Entity\UserMedia;
use App\Entity\UserFollows;
use App\Entity\Media;
use App\Entity\Review;
use App\Entity\UserActivity;
use App\Entity\Watchlist;
use App\Repository\UserActivityRepository;
use Doctrine\ORM\EntityManagerInterface;

class UserActivityService
{
    public function __construct(
        private EntityManagerInterface $em, 
        private UserActivityRepository $userActivityRepository
    ){}

    public function createMediaActivity(string $type, UserMedia $userMedia, User $user, Media $media): void
    {
        $userActivity = new UserActivity();
        $userActivity->setType($type);
        $userActivity->setMedia($media);
        $userActivity->setUserMedia($userMedia);
        $userActivity->setUser($user);
        $userActivity->setCreatedAt(new \DateTimeImmutable());

        $this->em->persist($userActivity);
        $this->em->flush();
        return;
    }

    public function createWatchlistActivity(string $type, Watchlist $watchlist, User $user, Media $media, UserMedia $userMedia): void
    {
        $userActivity = new UserActivity();
        $userActivity->setType($type);
        $userActivity->setMedia($media);
        $userActivity->setUserMedia($userMedia);
        $userActivity->setWatchlist($watchlist);
        $userActivity->setUser($user);
        $userActivity->setCreatedAt(new \DateTimeImmutable());

        $this->em->persist($userActivity);
        $this->em->flush();
        return;
    }

    public function createReviewActivity(string $type, Review $review, User $user, Media $media, UserMedia $userMedia): void
    {
        $userActivity = new UserActivity();
        $userActivity->setType($type);
        $userActivity->setMedia($media);
        $userActivity->setUserMedia($userMedia);
        $userActivity->setReview($review);
        $userActivity->setUser($user);
        $userActivity->setCreatedAt(new \DateTimeImmutable());

        $this->em->persist($userActivity);
        $this->em->flush();
        return;
    }

    // get the three latests activities
    public function userRecentActivity(User $user): array
    {
        $userActivity = $this->userActivityRepository->findByUser($user);

        $unique = [];
        $seen = [];

        foreach ($userActivity as $entity) {

            if ($entity->getUserMedia()) {
                $key = $entity->getType() . '_' . $entity->getUserMedia()->getId();
    
                if (!isset($seen[$key])) {
                    $seen[$key] = true;
                    $unique[] = $entity;
                }
            }

            if ($entity->getFollowing()) {
                $unique[] = $entity;
            }
        }

        return array_slice($unique, 0, 3);
    }

    public function createFollowActivity(string $type, User $user_follower, UserFollows $user_follows): void
    {
        $userActivity = new UserActivity();
        $userActivity->setType($type);
        $userActivity->setMedia(null);
        $userActivity->setUserMedia(null);
        $userActivity->setReview(null);
        $userActivity->setUser($user_follower);
        $userActivity->setFollowing($user_follows);
        $userActivity->setCreatedAt(new \DateTimeImmutable());

        $this->em->persist($userActivity);
        $this->em->flush();
        return;
    }

    public function findFollowingActivity(User $user): array
    {
        $recent_activities = $this->userActivityRepository->findFollowingActivity($user);
        $recent_activities_array = [];
        
        foreach($recent_activities as $activity) {
            $userMedia = $activity->getUserMedia();
            $media = $activity->getMedia();
            $watchlist = $activity->getWatchlist();
            $review = $activity->getReview();
            $user_followed = $activity->getFollowing();

            $recent_activities_array[] = [
                "id" => $activity->getId(),
                "user" => [
                    "username" => $activity->getUser()->getUsername(),
                    "profile_picture" => $activity->getUser()->getProfilePicture()
                ],
                "type" => $activity->getType(),
                "created_at" => $activity->getCreatedAt(),
                "user_media" => $userMedia ? [
                    "id" => $userMedia->getId(),
                    "rating" => $userMedia->getRating(),
                ] : null,
                "media" => $media ? [
                    "tmdb_id" => $media->getTmdbId(),
                    "type" => $media->getType()
                ] : null,
                "watchlist" => $watchlist ? [
                    "id" => $watchlist->getId(),
                    "title" => $watchlist->getTitle(),
                    "description" => $watchlist->getDescription()
                ] : null,
                "review" => $review ? [
                    "content" => $review->getContent()
                ] : null,
                "user_followed" => $user_followed ? [
                    "username" => $user_followed->getFollowing()->getUsername(),
                    "profile_picture" => $user_followed->getFollowing()->getProfilePicture()
                ] : null
            ];
        }

        return $recent_activities_array;

    }
}