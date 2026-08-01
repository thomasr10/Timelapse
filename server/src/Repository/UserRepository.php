<?php

namespace App\Repository;

use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\Security\Core\Exception\UnsupportedUserException;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\PasswordUpgraderInterface;
use Doctrine\DBAL\Connection;

/**
 * @extends ServiceEntityRepository<User>
 */
class UserRepository extends ServiceEntityRepository implements PasswordUpgraderInterface
{
    public function __construct(
        ManagerRegistry $registry,
        private Connection $connection
    )
    {
        parent::__construct($registry, User::class);
    }

    /**
     * Used to upgrade (rehash) the user's password automatically over time.
     */
    public function upgradePassword(PasswordAuthenticatedUserInterface $user, string $newHashedPassword): void
    {
        if (!$user instanceof User) {
            throw new UnsupportedUserException(sprintf('Instances of "%s" are not supported.', $user::class));
        }

        $user->setPassword($newHashedPassword);
        $this->getEntityManager()->persist($user);
        $this->getEntityManager()->flush();
    }

       /**
        * @return User[] Returns an array of User objects
        */
       public function findByUsername(string $value): array
       {
           return $this->createQueryBuilder('u')
               ->andWhere('u.username LIKE :val OR u.display_username LIKE :val')
               ->setParameter('val', '%' . $value . '%')
               ->orderBy('u.id', 'ASC')
               ->setMaxResults(10)
               ->getQuery()
               ->getResult()
           ;
       }

        public function findOneByUsername(string $username): ?User
        {
            return $this->createQueryBuilder('u')
                ->where('u.username = :username')
                ->setParameter('username', $username)
                ->getQuery()
                ->getOneOrNullResult();
        }

        public function follow(User $follower, User $userToFollow): void
        {
            $exists = $this->connection->fetchOne(
                'SELECT 1 FROM user_follows WHERE follower_id = ? AND following_id = ?',
                [$follower->getId(), $userToFollow->getId()]
            );

            if ($exists) return;

            if (!$exists) {
                $this->connection->insert('user_follows', [
                    'follower_id' => $follower->getId(),
                    'following_id' => $userToFollow->getId(),
                ]);
            }

            return;
        }

        public function unfollow(User $user_unfollower, User $user_to_unfollow): void
        {
            $exists = $this->connection->fetchOne(
                'SELECT 1 FROM user_follows WHERE follower_id = ? AND following_id = ?',
                [$user_unfollower->getId(), $user_to_unfollow->getId()]
            );

            if (!$exists) return;

            $this->connection->delete('user_follows', [
                'follower_id' => $user_unfollower->getId(),
                'following_id' => $user_to_unfollow->getId(),
            ]);

            return;
        }

        public function is_following(User $user, User $profile_user): bool
        {
            $exists = $this->connection->fetchOne(
                'SELECT 1 FROM user_follows WHERE follower_id = ? AND following_id = ?',
                [$user->getId(), $profile_user->getId()]
            );

            return $exists ? true : false;
        }

}
