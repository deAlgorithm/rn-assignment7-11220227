import React, { useState } from "react";
import {
  ActivityIndicator,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ProductDetails from "./ProductDetails"; // Assuming you have this component

const ProductItem = ({ product, addToCart }) => {
  const [showDetails, setShowDetails] = useState(false);

  // Log the product prop to inspect its structure
  console.log("ProductItem received product:", product);

  // Add default values to prevent errors
  const { title = 'Unnamed Product', price = 0.00, image = '' } = product || {};

  return (
    <View style={styles.productItem}>
      {product ? (
        <>
          <TouchableOpacity
            style={styles.imageContainer}
            onPress={() => setShowDetails(true)}
          >
            <Image source={{ uri: image }} style={styles.image} />
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => addToCart(product)}
            >
              <Ionicons name="add" size={24} color="white" />
            </TouchableOpacity>
          </TouchableOpacity>
          <Text style={styles.name}>{title}</Text>
          <Text style={styles.price}>${price.toFixed(2)}</Text>
          {showDetails && (
            <ProductDetails
              product={product}
              visible={showDetails}
              onClose={() => setShowDetails(false)}
              onAddToCart={addToCart}
            />
          )}
        </>
      ) : (
        <ActivityIndicator size="large" color="#0000ff" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  productItem: {
    margin: 6,
    width: "48%",
    padding: 8,
    backgroundColor: '#fefefe',
    elevation: 1,
    shadowColor: '#aaa',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
  },
  imageContainer: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
  },
  image: {
    width: "100%",
    height: 220,
    borderRadius: 8,
  },
  addButton: {
    position: "absolute",
    right: 8,
    bottom: 10,
    borderWidth: 1,
    borderColor: "white",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 15,
    padding: 4,
  },
  name: {
    fontSize: 16,
    marginTop: 8,
    marginBottom: 4,
    textAlign: 'center',
  },
  price: {
    fontSize: 14,
    marginBottom: 4,
    color: "red",
    textAlign: 'center',
  },
});

export default ProductItem;
