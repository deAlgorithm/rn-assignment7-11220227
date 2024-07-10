import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet, TouchableOpacity, Text, Image } from "react-native";
import ProductItem from "../components/ProductItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';

const HomeScreen = ({ navigation }) => {
  const [cartItems, setCartItems] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  const fetchProducts = () => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        console.log(response.data);
        setAllProducts(response.data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  };

  useEffect(() => {
    fetchProducts();
    const loadCart = async () => {
      const storedCart = await AsyncStorage.getItem("cart");
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
    };
    loadCart();
  }, []);

  const addToCart = async (product) => {
    const itemExists = cartItems.find((item) => item.id === product.id);
    if (itemExists) {
      return; // If item already exists in cart, do not add again
    }

    const updatedCart = [...cartItems, product];
    setCartItems(updatedCart);
    await AsyncStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Image source={require("../assets/Menu.png")} style={{width:40,height:40}} />
        </TouchableOpacity>
        <Text style={styles.title}>PRICE MASTERS 🛒</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity onPress={() => navigation.navigate("Search")}>
          <Text style={{fontSize:24}}> 🔎</Text>
          </TouchableOpacity>
          <View style={styles.cartContainer}>
            <Text style={styles.cartItemCount}>{cartItems.length}</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
              <Text style={{fontSize:24}}> 🛒</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.storyContainer}>
        <Text style={styles.storyTitle}>OUR STORY</Text>
        <View style={styles.iconContainer}>
          <View style={styles.line} />
          <View style={styles.iconCircle}>
          <Text style={{fontSize:24}}>🗄</Text>
          </View>
          <View style={styles.iconCircle}>
          <Text style={{fontSize:24}}>🎚</Text>
          </View>
        </View>
      </View>
      <FlatList
        data={allProducts}
        numColumns={2}
        renderItem={({ item }) => (
          <ProductItem product={item} addToCart={addToCart} />
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.productList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  cartContainer: {
    position: "relative",
    marginLeft: 20,
  },
  cartItemCount: {
    position: "absolute",
    top: -10,
    right: -10,
    backgroundColor: "red",
    color: "white",
    borderRadius: 10,
    padding: 2,
    paddingHorizontal: 5,
    fontSize: 12,
    zIndex: 1,
  },
  icon: {
    width: 24,
    height: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  storyContainer: {
    width: '100%',
    marginVertical: 20,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  storyTitle: {
    fontSize: 18,
    fontWeight: '400',
    letterSpacing: 4,
    marginBottom: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    position: 'relative',
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: '#eeede9',
    marginHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  productList: {
    padding: 10,
  },
});

export default HomeScreen;
