const products = [
  // === ДАЧА - Дачная - Базовая ===
  { id: 1, purpose: 'Дача', lineup: 'Дачная', subtype: 'Базовая', name: 'Дачная Базовая 2×3', size: '2×3', price: null, condition: null, kitType: 'Базовая дачная' },
  { id: 2, purpose: 'Дача', lineup: 'Дачная', subtype: 'Базовая', name: 'Дачная Базовая 2×4', size: '2×4', price: 339000, condition: 'Акция — цена до июня', kitType: 'Базовая дачная' },
  { id: 3, purpose: 'Дача', lineup: 'Дачная', subtype: 'Базовая', name: 'Дачная Базовая 2×5', size: '2×5', price: null, condition: null, kitType: 'Базовая дачная' },
  { id: 4, purpose: 'Дача', lineup: 'Дачная', subtype: 'Базовая', name: 'Дачная Базовая 2×4 ВЛК', size: '2×4 ВЛК', price: 399000, condition: 'Акция — подарок', kitType: 'Базовая дачная' },
  { id: 5, purpose: 'Дача', lineup: 'Дачная', subtype: 'Базовая', name: 'Дачная Базовая 4×4', size: '4×4', price: 590000, condition: null, kitType: 'Базовая дачная' },
  { id: 6, purpose: 'Дача', lineup: 'Дачная', subtype: 'Базовая', name: 'Дачная Базовая 2×4 + веранда 2×2', size: '2×4 + веранда 2×2', price: null, condition: null, kitType: 'Базовая дачная' },
  // === ДАЧА - Дачная - Классика ===
  { id: 7, purpose: 'Дача', lineup: 'Дачная', subtype: 'Классика', name: 'Дачная Классика 2×4', size: '2×4', price: null, condition: null, kitType: 'Дачная' },
  { id: 8, purpose: 'Дача', lineup: 'Дачная', subtype: 'Классика', name: 'Дачная Классика 2×5', size: '2×5', price: null, condition: null, kitType: 'Дачная' },
  { id: 9, purpose: 'Дача', lineup: 'Дачная', subtype: 'Классика', name: 'Дачная Классика 2×4 ВВК', size: '2×4 ВВК', price: 583000, condition: 'Акция — подарок', kitType: 'Дачная' },
  { id: 10, purpose: 'Дача', lineup: 'Дачная', subtype: 'Классика', name: 'Дачная Классика 4×4', size: '4×4', price: 686000, condition: null, kitType: 'Дачная' },
  { id: 11, purpose: 'Дача', lineup: 'Дачная', subtype: 'Классика', name: 'Дачная Классика 4×4 ВВК', size: '4×4 ВВК', price: 849000, condition: 'Акция — цена до июня', kitType: 'Дачная' },
  { id: 12, purpose: 'Дача', lineup: 'Дачная', subtype: 'Классика', name: 'Дачная Классика 4×6', size: '4×6', price: 950000, condition: 'Акция — цена до июня', kitType: 'Дачная' },
  { id: 13, purpose: 'Дача', lineup: 'Дачная', subtype: 'Классика', name: 'Дачная Классика 4×6 + веранда 2×6', size: '4×6 + веранда 2×6', price: null, condition: null, kitType: 'Дачная' },
  // === ДАЧА - Дачная - Комфорт ===
  { id: 14, purpose: 'Дача', lineup: 'Дачная', subtype: 'Комфорт', name: 'Дачная Комфорт 2×4 ВВК', size: '2×4 ВВК', price: null, condition: null, kitType: 'Комфорт дачная' },
  { id: 15, purpose: 'Дача', lineup: 'Дачная', subtype: 'Комфорт', name: 'Дачная Комфорт 2×5', size: '2×5', price: null, condition: null, kitType: 'Комфорт дачная' },
  { id: 16, purpose: 'Дача', lineup: 'Дачная', subtype: 'Комфорт', name: 'Дачная Комфорт 4×4', size: '4×4', price: null, condition: null, kitType: 'Комфорт дачная' },
  { id: 17, purpose: 'Дача', lineup: 'Дачная', subtype: 'Комфорт', name: 'Дачная Комфорт 4×4 ВВК', size: '4×4 ВВК', price: 950000, condition: 'Акция — цена до июня', kitType: 'Комфорт дачная' },
  { id: 18, purpose: 'Дача', lineup: 'Дачная', subtype: 'Комфорт', name: 'Дачная Комфорт 4×6', size: '4×6', price: 1250000, condition: 'Акция — цена до июня', kitType: 'Комфорт дачная' },
  { id: 19, purpose: 'Дача', lineup: 'Дачная', subtype: 'Комфорт', name: 'Дачная Комфорт 4×6 + веранда 2×6', size: '4×6 + веранда 2×6', price: 1300000, condition: 'Акция — цена до июня', kitType: 'Комфорт дачная' },
  // === ДАЧА - Дом-баня ===
  { id: 20, purpose: 'Дача', lineup: 'Дом-баня', subtype: 'Дом-баня', name: 'Дом-баня 6×6 + веранда 2×6', size: '6×6 + веранда 2×6', price: null, condition: null, kitType: 'Баня-Дом' },
  { id: 21, purpose: 'Дача', lineup: 'Дом-баня', subtype: 'Дом-баня', name: 'Дом-баня 7×8', size: '7×8', price: null, condition: null, kitType: 'Баня-Дом' },
  { id: 22, purpose: 'Дача', lineup: 'Дом-баня', subtype: 'Дом-баня', name: 'Дом-баня 8×8', size: '8×8', price: null, condition: null, kitType: 'Баня-Дом' },
  // === ДОМ - Народная - Базовая ===
  { id: 23, purpose: 'Дом', lineup: 'Народная', subtype: 'Базовая', name: 'Народная Базовая 2×4 ВВК', size: '2×4 ВВК', price: 599000, condition: 'Новый проект', kitType: 'Народная-базовая' },
  { id: 24, purpose: 'Дом', lineup: 'Народная', subtype: 'Базовая', name: 'Народная Базовая 2×5', size: '2×5', price: 499000, condition: null, kitType: 'Народная-базовая' },
  { id: 25, purpose: 'Дом', lineup: 'Народная', subtype: 'Базовая', name: 'Народная Базовая 4×4', size: '4×4', price: 699000, condition: null, kitType: 'Народная-базовая' },
  // === ДОМ - Народная - Классика ===
  { id: 26, purpose: 'Дом', lineup: 'Народная', subtype: 'Классика', name: 'Народная Классика 2,4×5', size: '2,4×5', price: 649000, condition: 'Акция — цена до июня', kitType: 'Народная' },
  { id: 27, purpose: 'Дом', lineup: 'Народная', subtype: 'Классика', name: 'Народная Классика 2,4×5 ВЛК', size: '2,4×5 ВЛК', price: 799000, condition: 'Акция — цена до июня', kitType: 'Народная' },
  { id: 28, purpose: 'Дом', lineup: 'Народная', subtype: 'Классика', name: 'Народная Классика 4×4.8 двускатная', size: '4×4.8 двускатная', price: 880000, condition: 'Акция — подарок', kitType: 'Народная' },
  { id: 29, purpose: 'Дом', lineup: 'Народная', subtype: 'Классика', name: 'Народная Классика 4×4.8 + веранда 2×4', size: '4×4.8 + веранда 2×4', price: 1089000, condition: 'Акция — цена до июня', kitType: 'Народная' },
  { id: 30, purpose: 'Дом', lineup: 'Народная', subtype: 'Классика', name: 'Народная Классика 4×6', size: '4×6', price: 1320000, condition: 'Акция — цена до июня', kitType: 'Народная' },
  { id: 31, purpose: 'Дом', lineup: 'Народная', subtype: 'Классика', name: 'Народная Классика 4×6 + веранда 2,5×6', size: '4×6 + веранда 2,5×6', price: 1490000, condition: null, kitType: 'Народная' },
  // === ДОМ - Народная - Комфорт ===
  { id: 32, purpose: 'Дом', lineup: 'Народная', subtype: 'Комфорт', name: 'Народная Комфорт 2,4×5', size: '2,4×5', price: null, condition: null, kitType: 'Народная- комофрт' },
  { id: 33, purpose: 'Дом', lineup: 'Народная', subtype: 'Комфорт', name: 'Народная Комфорт 2,4×5 ВВК', size: '2,4×5 ВВК', price: null, condition: null, kitType: 'Народная- комофрт' },
  { id: 34, purpose: 'Дом', lineup: 'Народная', subtype: 'Комфорт', name: 'Народная Комфорт 4×4,8', size: '4×4,8', price: 1056000, condition: null, kitType: 'Народная- комофрт' },
  { id: 35, purpose: 'Дом', lineup: 'Народная', subtype: 'Комфорт', name: 'Народная Комфорт 4×4,8 + веранда 2×4', size: '4×4,8 + веранда 2×4', price: null, condition: null, kitType: 'Народная- комофрт' },
  { id: 36, purpose: 'Дом', lineup: 'Народная', subtype: 'Комфорт', name: 'Народная Комфорт 4×6', size: '4×6', price: 1584000, condition: null, kitType: 'Народная- комофрт' },
  { id: 37, purpose: 'Дом', lineup: 'Народная', subtype: 'Комфорт', name: 'Народная Комфорт 4×6 + веранда 2,5×6', size: '4×6 + веранда 2,5×6', price: 1788000, condition: null, kitType: 'Народная- комофрт' },
  // === ДОМ - Пинтерест ===
  { id: 38, purpose: 'Дом', lineup: 'Пинтерест', subtype: 'Comfort box', name: 'Comfort box 2,5×6', size: '2,5×6', price: 946000, condition: null, kitType: 'Модульные' },
  { id: 39, purpose: 'Дом', lineup: 'Пинтерест', subtype: 'Comfort box', name: 'Comfort box 5×6 + веранда', size: '5×6 + веранда', price: 1129000, condition: null, kitType: 'Модульные' },
  { id: 40, purpose: 'Дом', lineup: 'Пинтерест', subtype: 'Г-образная', name: 'Г-образная 5×6', size: '5×6', price: 1500000, condition: 'Акция — цена до июня', kitType: 'Модульные' },
  // === ДОМ - Авторский ===
  { id: 41, purpose: 'Дом', lineup: 'Авторский', subtype: null, name: 'Авторский проект 3×8', size: '3×8', price: null, condition: null, kitType: 'Баня-Дом' },
  { id: 42, purpose: 'Дом', lineup: 'Авторский', subtype: null, name: 'Авторский проект 6×6', size: '6×6', price: null, condition: null, kitType: 'Баня-Дом' },
];