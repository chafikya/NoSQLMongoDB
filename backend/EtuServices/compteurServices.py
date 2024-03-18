import redis
import sys

# Fonction pour stocker les appels de service dans Redis
def stocker_appel_service(user_id, service_type):
    r = redis.StrictRedis(host='localhost', port=6379, db=1)
    r.lpush("appels_services", f"{user_id}:{service_type}")


if __name__ == "__main__":
    # Extrait l'identifiant de l'utilisateur et le type de service à partir des arguments de la ligne de commande
    user_id = sys.argv[1]
    service_type = sys.argv[2]

    # Appelle la fonction pour stocker l'appel de service dans Redis
    stocker_appel_service(user_id, service_type)
