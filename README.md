Considera una tienda en donde cada producto tiene precio por unidad y precio por volumen. Por ejemplo, los chocolates valen $1.000 y cuatro chocolates $3.200 en total.

Implementa un programa para punto de venta (PoS) que acepte un orden arbitrario
de productos (similar a lo que pasaría en una caja de supermercado) y que imprima el valor total para todos los productos que se encuentren en su base de datos.

El valor total se deberá calcular en función de los precios por unidad o por volumen en los casos que corresponda.

Considera los siguientes datos para probar tu solución:

Producto, Precio
A, 1200 por unidad y 1000 por unidad por cada 4 unidades
B, 3000
C, 4500
D, 225 por unidad y 200 por unidad por cada 10 unidades
E, 3250
F, 4990

Puedes programar la solución en el lenguaje de programación de tu preferencia.

Ejemplos de prueba:

ABCABCDEF verifica un valor total de 25865
CCCCCC verifica un valor total de 27000
EFEFEF verifica un valor total de 24720
ABCDEF verifica un valor total de 17165
EAAAA verifica un valor total de 7250


Segunda parte:

Feature: Multiple styles of volume discounts

The system already handles items that are cheaper when sold in certain quantities but sell at their individual price when sold "loose."

We also want to sell some items that should have volume discounts applied as long as the customer buys more than a threshold quantity. There's no "penalty" for buying odd quantities of these items.

For example, the type of item we already handle works like this:
A G costs 1.00 each, but they're available in cases of 10 for 9.00 a case, so:
  | Quantity             | Total |
  | G                    | 1.00  |
  | GGG                  | 3.00  |
  | GGGGGGGGGG (10 Gs)   | 9.00  |
  | GGGGGGGGGGGG (12 Gs) | 11.00 |

Whereas the new type of item we want to handle should work like this:
An F costs 1.00 each, but only 0.90 each when buying 10 or more, so:
  | Scanned items        | Total |
  | F                    | 1.00  | <-- Same as G
  | FFF                  | 3.00  | <-- Same as G
  | FFFFFFFFFF (10 Fs)   | 9.00  | <-- Same as G
  | FFFFFFFFFFFF (12 Fs) | 10.80 | <-- Different from G