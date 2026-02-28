import json


def filtra_parole_5_lettere(file_input, file_output):
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

# Uso
filtra_parole_5_lettere('word_list.txt', '5lettere.json')