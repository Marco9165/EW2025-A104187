import json

with open("dataset_reparacoes.json", "r", encoding="utf-8") as f:
    data = json.load(f)

viaturas = []
intervencoes = []
viaturas_set = set()
intervencoes_set = set()

for i, reparacao in enumerate(data["reparacoes"], start=1):
    reparacao["id"] = i  
    
    viatura = reparacao["viatura"]
    viatura_tuple = (viatura["marca"], viatura["modelo"], viatura["matricula"])
    
    if viatura_tuple not in viaturas_set:
        viaturas_set.add(viatura_tuple)
        viaturas.append(viatura)

    for intervencao in reparacao["intervencoes"]:
        intervencao_tuple = (intervencao["codigo"], intervencao["nome"], intervencao["descricao"])
        
        if intervencao_tuple not in intervencoes_set:
            intervencoes_set.add(intervencao_tuple)
            intervencoes.append(intervencao)

novo_json = {
    "reparacoes": data["reparacoes"],
    "viaturas": viaturas,
    "intervencoes": intervencoes
}

with open("dataset_new.json", "w", encoding="utf-8") as f:
    json.dump(novo_json, f, indent=4, ensure_ascii=False)