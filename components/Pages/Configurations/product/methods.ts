import { configurationsSelector } from "@services/store/slices/configurations"
import { getDate } from "@services/utils/functions/format"

export const getProductsData = () =>
  configurationsSelector.getAllProductsTypes()

export const productsDataTables = (products: IProduct[]) =>
  products.map(product => [
    getDate(product.datation.creationTime),
    product.designation,
    product.amount,
    `${product.required}`,
    `${product.periodicity.frequency} ${product.periodicity.value}`,
    `${product.activated}`
  ])
