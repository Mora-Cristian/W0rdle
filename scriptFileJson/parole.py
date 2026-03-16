import json

def filtra_parole_5_lettere(file_input):
    parole_5_lettere = []
    # Legge 
    with open(file_input, 'r', encoding='utf-8') as f:
        for riga in f:
            parola = riga.strip()  
            if len(parola) == 5:
                parole_5_lettere.append(parola)
    return parole_5_lettere    


# Uso
paroleNormali = filtra_parole_5_lettere('scriptFileJson\word_list.txt')
paroleVerbi = filtra_parole_5_lettere('scriptFileJson\coniugazione_verbi (1).txt')
paroleSegreteIniziali = filtra_parole_5_lettere('scriptFileJson//60000_parole_italiane.txt')
paroleGiuste = []
paroleSegreteFinali = []
lettereStrane = ["w", "x", "y", "j", "k"]
consonanti = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 
              'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z']

#PAROLE CORRETTE:
for elemento in paroleNormali:
    if elemento[0] in lettereStrane:
        continue
    if elemento[-1] in consonanti:
        continue
    paroleGiuste.append(elemento)
    

with open("5lettere.json", "w") as file:
    json.dump(paroleGiuste, file, indent=4)

#PAROLE SEGRETE:
def paroleSegrete(file_input, file_output):
    parole_5_lettere = []
    
    # Legge 
    with open(file_input, 'r', encoding='utf-8') as f:
        for riga in f:
            parola = riga.strip()  
            if len(parola) == 5:
                parole_5_lettere.append(parola)
    
    # Scrive 
    with open(file_output, 'w', encoding='utf-8') as f:
        json.dump(parole_5_lettere, f, ensure_ascii=False, indent=2)
    
    print(f"Trovate {len(parole_5_lettere)} parole con 5 lettere")
    print(f"Salvate in {file_output}")
    
#SOLUZIONI:
for elemento in paroleSegreteIniziali:
    if elemento[0] in lettereStrane:
        continue
    if elemento[-1] in consonanti:
        continue
    if elemento not in paroleVerbi:
        paroleSegreteFinali.append(elemento)


with open("paroleComuni.json", "w") as file:
    json.dump(paroleSegreteFinali, file, indent=4)