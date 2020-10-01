var data = new Date()
var open = ''
var close = ''

export function isOpen(openingHours){
   if(openingHours){
    switch (data.getDay()) {        
        case 1:
          open = openingHours.seg_horario_inicio
          close = openingHours.seg_horario_fim
          break;
        case 2:
            open= openingHours.ter_horario_inicio
            close = openingHours.ter_horario_fim
          break;
        case 3:
            open= openingHours.quar_horario_inicio
            close = openingHours.quar_horario_fim
          break;
        case 4:
            open= openingHours.quin_horario_inicio
            close = openingHours.quin_horario_fim
          break;
        case 5:
            open= openingHours.sex_horario_inicio
            close = openingHours.sex_horario_fim
          break; 
        case 6:
            open= openingHours.sab_horario_inicio
            close = openingHours.sab_horario_fim
          break; 
        case 0:
            open= openingHours.dom_horario_inicio
            close = openingHours.dom_horario_fim
        break;
        default:
          console.log("Algo deu errado");
      } 
   

    const now = data.getHours() + '.' +  data.getMinutes()
    if(open && close){
    const newOpen = open.replace(':', '.')    
    const newClose = close.replace(':', '.')
    if(parseFloat(now) >= parseFloat(newOpen) && parseFloat(now) <= parseFloat(newClose) ){
        return true
    }}
    return false
   }
      
}

export function week (){
    switch (data.getDay()) {        
        case 1:
            return 'Segunda'
        case 2:
          return 'Terça'
        case 3:
          return  'Quarta'
        case 4:
          return 'Quinta'
        case 5:
          return 'Sexta'
        case 6:
          return 'Sábado'
        case 0:
          return 'Domingo'
        default:
          console.log("Algo deu errado");
      } 
}