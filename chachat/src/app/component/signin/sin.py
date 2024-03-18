def intersectionnulle(self, other):
    #C {x, y, z}
    norme = sqrt(sum([(self.C.cord  - other.C.cord)** 2 for cord in [x,  y, z]]))
    return norm < r1 + r2

def liste_spheres():
    C0 = []
    R0=1
    l = [[[0,0,0],R0]]
    for i in range(75):
        alpha_i = R0/8 if i+1 %2 == 0 else R0/4
        C = C0 +[alpha_i, alpha_i, alpha_i]
        R = R0 * 1.5
        l.append([C,R])
        R0 = R
        C0 = []
    return l
liste = liste_spheres()
print(liste)