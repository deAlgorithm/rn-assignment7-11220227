import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CartItem = ({ product, onRemoveFromCart, onUpdateQuantity }) => {
  return (
    <View style={styles.cartItem}>
      <Image 
        source={{uri: product.image}} 
        style={styles.image} 
        defaultSource={require('../assets/shoppingBag.png')}
      />
      <View style={styles.details}>
        <Text style={styles.name}>{product.title}</Text>
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
        <View style={styles.quantityControl}>
          <TouchableOpacity style={styles.quantityButton} onPress={() => onUpdateQuantity(product.id, -1)}>
            <Ionicons name="remove" size={18} color="white" />
          </TouchableOpacity>
          <Text style={styles.quantity}>{product.quantity}</Text>
          <TouchableOpacity style={styles.quantityButton} onPress={() => onUpdateQuantity(product.id, 1)}>
            <Ionicons name="add" size={18} color="white" />
          </TouchableOpacity>
        </View>
        <Text style={styles.subtotal}>
          Subtotal: ${(product.price * product.quantity).toFixed(2)}
        </Text>
      </View>
      <TouchableOpacity onPress={() => onRemoveFromCart(product.id)} style={styles.removeButton}>
        <Ionicons name="trash" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  image: {
    width: 80,
    height: 100,
    borderRadius: 8,
    marginRight: 15,
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  quantityButton: {
    backgroundColor: '#007AFF',
    padding: 8,
    borderRadius: 4,
    marginHorizontal: 5,
  },
  quantity: {
    fontSize: 16,
    paddingHorizontal: 10,
  },
  subtotal: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  removeButton: {
    padding: 10,
  },
});

export default CartItem;
