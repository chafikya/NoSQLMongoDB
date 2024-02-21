import redis
import time
import sys

# Connexion à Redis
redis_client = redis.StrictRedis(host='localhost', port=6379, db=0)

def autoriser_connexion_utilisateur(id_utilisateur):
    now = int(time.time())
    cle_connexions = f"utilisateur:{id_utilisateur}:connexions_timestamp"

    # Vérifier les connexions dans les 10 dernières minutes
    recent_connexions = redis_client.zcount(cle_connexions, now - 600, now)
    
    # Obtenir le nombre actuel de connexions pour cet utilisateur
    nb_connexions = int(redis_client.get(f"utilisateur:{id_utilisateur}:connexions") or 0)

    if recent_connexions >= 10:
        # Refuser la connexion si l'utilisateur a déjà 10 connexions ou plus dans les dernières 10 minutes
        return False
    else:
        # Autoriser la connexion
        # Incrémenter le nombre de connexions pour cet utilisateur
        redis_client.incr(f"utilisateur:{id_utilisateur}:connexions")
        # Mettre à jour le hset avec le nouveau nombre de connexions
        redis_client.hset("utilisateurs_connectes", id_utilisateur, nb_connexions + 1)
        # Ajouter le timestamp de la connexion actuelle
        redis_client.zadd(cle_connexions, {now: now})
        redis_client.expire(cle_connexions, 600)  # Expire après 10 minutes
        return True

if __name__ == "__main__":
    if len(sys.argv) > 1:
        id_utilisateur = sys.argv[1]
        #id_utilisateur = 1
        if autoriser_connexion_utilisateur(id_utilisateur):
            print("Connexion autorisee.")
        else:
            print("Connexion refusee.")
    else:
        print("ID utilisateur manquant.")