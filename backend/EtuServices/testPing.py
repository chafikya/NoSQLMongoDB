# -*- coding: utf-8 -*-
"""
Created on Thu Feb  8 17:50:22 2024

@author: chafi
"""

import redis

# Connexion à Redis
r = redis.StrictRedis(host='localhost', port=6379, db=0)

# Vérification de la connexion
try:
    response = r.ping()
    if response == True:
        print("Connexion à la base de données 0 réussie.")
    else:
        print("Impossible de se connecter à la base de données 0.")
except redis.exceptions.ConnectionError:
    print("Erreur de connexion à Redis.")
