import { useContext } from "react";
import { CartContext } from "../context/cartContext";

export default function CartPage() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("No se encuentra CartContext");
    }
    const { cart, removeFromCart, updateQuantity } = context;

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Carrito de Compras</h1>
                <p className="text-xl font-semibold">Total: US$ {total.toFixed(2)}</p>
            </div>
            
            <div className="space-y-4">
                {cart.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No hay productos en el carrito</p>
                ) : (
                    cart.map((item) => (
                        <div key={item.id} className="flex items-center gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                            <img 
                                src={item.imageUrl} 
                                alt={item.title} 
                                className="w-20 h-20 object-cover rounded-md"
                            />
                            <div className="flex-1">
                                <h3 className="font-medium">{item.title}</h3>
                                <p className="text-sm text-gray-500">US$ {item.price}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button 
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                                >
                                    -
                                </button>
                                <span className="w-8 text-center">{item.quantity}</span>
                                <button 
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                                >
                                    +
                                </button>
                            </div>
                            <button
                                onClick={() => removeFromCart(item.id)}
                                className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md"
                            >
                                Eliminar
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}