// utils/getTextColor.ts
export function getTextColor(hexColor: string): 'black' | 'white' {
    // Remove o "#" se existir
    const color = hexColor.replace('#', '');
  
    // Converte a cor para valores RGB
    const r = parseInt(color.substring(0, 2), 16);
    const g = parseInt(color.substring(2, 4), 16);
    const b = parseInt(color.substring(4, 6), 16);
  
    // Calcula o brilho (luminância relativa aproximada)
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  
    // Retorna a cor de texto com melhor contraste
    return brightness > 128 ? 'black' : 'white';
  }