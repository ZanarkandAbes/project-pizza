import React, { useState, useEffect } from 'react'
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity,
    TextInput,
    Modal,
    FlatList
} from 'react-native'

import { useRoute, RouteProp, useNavigation } from '@react-navigation/native'

import { Feather } from '@expo/vector-icons'
import { api } from '../../services/api'
import { ModalPicker } from '../../components/ModalPicker'
import { ListItem } from '../../components/ListItem'

import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { StackParamsList } from "../../routes/app.routes"

type RouteDetailParams = {
    Order: {
        number: string | number
        order_id: string
    }
}

export type CategoryProps = {
    id: string
    name: string
}

type ProductProps = {
    id: string
    name: string
}

type ItemProps = {
    id: string
    product_id: string
    name: string
    amount: string | number
}

type OrderRouteProps = RouteProp<RouteDetailParams, 'Order'>

export default function Order() {
    const route = useRoute<OrderRouteProps>()
    const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>()

    const [category, setCategory] = useState<CategoryProps[] | []>([])
    const [categorySelected, setCategorySelected] = useState<CategoryProps | undefined>()
    const [modalCategoryVisible, setModalCategoryVisible] = useState(false)

    const [products, setProducts] = useState<ProductProps[] | []>([])
    const [productSelected, setProductSelected] = useState<ProductProps | undefined>()
    const [modalProductVisible, setModalProductVisible] = useState(false)

    const [amount, setAmount] = useState('1')
    const [items, setItems] = useState<ItemProps[] | []>([])

    const orderId = route?.params?.order_id
    const number = route?.params?.number

    useEffect(() => {
        const loadInfo = async () => {
            const response = await api.get('/categories')

            setCategory(response?.data)
            setCategorySelected(response?.data[0])

        }

        loadInfo()
    }, [])

    useEffect(() => {
        const loadProducts = async () => {
            const response = await api.get('/product/category', { params: {
                category_id: categorySelected?.id
            }})

            setProducts(response?.data)
            setProductSelected(response?.data[0])
        }

        loadProducts()

    }, [categorySelected])

    const handleCloseOrder = async() => {
        try {
            await api.delete('/order', { params: { order_id: orderId } })

            navigation.goBack()
        } catch (err) {
            console.log(err)
        }
    }

    const handleChangeCategory = (item: CategoryProps) => {
        setCategorySelected(item)
    }

    const handleChangeProduct = (item: ProductProps) => {
        setProductSelected(item)
    }

    const handleAddItem = async () => {
        const response = await api.post('/order/add', { order_id: orderId, product_id: productSelected?.id, amount: Number(amount) })

        const data = {
            id: response?.data?.id,
            product_id: productSelected?.id as string,
            name: productSelected?.name as string,
            amount: amount
        }

        setItems(oldArray => [...oldArray, data])
    }

    const handleDeleteItem = async (item_id: string) => {
        await api.delete('/order/remove', { params: { item_id: item_id } })

        const filteredItems = items.filter(item => item.id !== item_id)

        setItems(filteredItems)
    }

    const handleFinishOrder = () => {
        navigation.navigate("FinishOrder", { number: number, order_id: orderId })
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Mesa {number}</Text>
                {items?.length === 0 && (
                    <TouchableOpacity onPress={handleCloseOrder}>
                        <Feather name="trash-2" size={28} color="#ff3f4b"/>
                    </TouchableOpacity>
                )}
            </View>

            {category.length !== 0 && (
                <TouchableOpacity style={styles.input} onPress={ () => setModalCategoryVisible(true) }>
                    <Text style={{ color: '#fff' }}>
                        {categorySelected?.name}
                    </Text>
                </TouchableOpacity>
            )}

            {products.length !== 0 && (
                <TouchableOpacity style={styles.input} onPress={ () => setModalProductVisible(true) }>
                    <Text style={{ color: '#fff' }}>
                        {productSelected?.name}
                    </Text>
                </TouchableOpacity>
            )}

            <View style={styles.quantityContainer}>
                <Text style={styles.quantityText}>Quantidade</Text>
                <TextInput 
                    style={[styles.input, { width: '60%', textAlign: 'center' } ]} 
                    placeholderTextColor='#f0f0f0' 
                    keyboardType='numeric' 
                    value={amount} 
                    onChangeText={setAmount} 
                />
            </View>

            <View style={styles.actions}>
                <TouchableOpacity style={styles.buttonAdd} onPress={handleAddItem}>
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[styles.button, { opacity: items?.length === 0 ? 0.3 : 1 }]}
                    disabled={items?.length === 0}
                    onPress={handleFinishOrder}
                >
                    <Text style={styles.buttonText}>Avançar</Text>
                </TouchableOpacity>
            </View>

            <FlatList 
                showsVerticalScrollIndicator={false}
                style={{ flex: 1, marginTop: 24 }}
                data={items}
                keyExtractor={(item) => item?.id}
                renderItem={ ({ item }) => <ListItem data={item} deleteItem={handleDeleteItem} /> }
            />

            <Modal
                transparent={true}
                visible={modalCategoryVisible}
                animationType='fade'
            >
                <ModalPicker 
                    handleCloseModal={ () => setModalCategoryVisible(false)}
                    options={category}
                    selectedItem={ handleChangeCategory }
                />
            </Modal>

            <Modal
                transparent={true}
                visible={modalProductVisible}
                animationType='fade'
            >
                <ModalPicker 
                    handleCloseModal={ () => setModalProductVisible(false)}
                    options={products}
                    selectedItem={ handleChangeProduct }
                />
            </Modal>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1d1d2e',
        paddingVertical: '5%',
        paddingEnd: '4%',
        paddingStart: '4%'
    },
    header: {
        flexDirection: 'row',
        marginBottom: 12,
        alignItems: 'center',
        marginTop: 24
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#fff',
        marginRight: 14
    },
    input: {
        backgroundColor: '#101026',
        borderRadius: 4,
        width: '100%',
        height: 40,
        marginBottom: 12,
        justifyContent: 'center',
        paddingHorizontal: 8,
        color: '#fff',
        fontSize: 20
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    quantityText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff'
    },
    actions: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between'
    },
    buttonAdd: {
        width: '20%',
        backgroundColor: '#3fd1ff',
        borderRadius: 4,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: '#101026',
        fontSize: 18,
        fontWeight: 'bold'
    },
    button: {
        backgroundColor: '#3fffa3',
        borderRadius: 4,
        height: 40,
        width: '75%',
        justifyContent: 'center',
        alignItems: 'center'
    }
})