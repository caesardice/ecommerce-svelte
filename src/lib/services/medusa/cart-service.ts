import type { Error } from '$lib/types'
import { getMedusajsApi, postMedusajsApi } from '$lib/utils/server'
import { error } from '@sveltejs/kit'
import { mapMedusajsCart } from './medusa-utils'
import { REGION_ID } from '.'

export const fetchCartData = async ({ origin, storeId, server = false, sid = null }: any) => {
	try {
		let res: any = {}

		res = await getMedusajsApi(`cart`, {}, sid)

		return res || {}
	} catch (err) {
		const e = err as Error
		throw error(e.status, e.data.message)
	}
}

export const fetchRefreshCart = async ({
	origin,
	storeId,
	cookies,
	server = false,
	sid = null
}: any) => {
	try {
		let res: any = {}
		const cart_id = cookies.get('cartId')

		if (!cart_id || cart_id == 'undefined') return []

		const cartRes = await getMedusajsApi(`carts/${cart_id}`)
		res = mapMedusajsCart(cartRes?.cart)

		return res || {}
	} catch (e) {
		throw error(e.status, e.message)
	}
}

export const fetchMyCart = async ({ origin, storeId, server = false, sid = null }: any) => {
	try {
		let res: any = {}

		res = {} // await getMedusajsApi(`cart/me`, {}, sid)

		return res || {}
	} catch (err) {
		throw error(e.status, e.message)
	}
}

export const addToCartService = async ({
	pid,
	vid,
	qty,
	customizedImg,
	origin,
	storeId,
	server = false,
	cookies,
	sid = null
}: any) => {
	try {
		let cart_id = cookies.get('cartId')
		if (cart_id == 'undefined') cart_id = null

		const body = {
			variant_id: vid || pid,
			quantity: qty
		}
		let res: any = {}
		if (!cart_id) {
			const cartRes = await postMedusajsApi(`carts`, { region_id: REGION_ID }, sid)
			cart_id = cartRes.cart?.id
		}
		const res_data = await postMedusajsApi(`carts/${cart_id}/line-items`, body, sid)

		res = mapMedusajsCart(res_data?.cart)

		return res || {}
	} catch (e) {
		// console.error(e)
		throw error(e.status, e.message)
	}
}

export const applyCouponService = async ({
	code,
	origin,
	storeId,
	server = false,
	sid = null
}: any) => {
	try {
		let res: any = {}

		res = await getMedusajsApi(`cart/me`, {}, sid)

		return res || {}
	} catch (e) {
		throw error(e.status, e.message)
	}
}

export const removeCouponService = async ({
	code,
	origin,
	storeId,
	server = false,
	sid = null
}: any) => {
	try {
		let res: any = {}

		res = await getMedusajsApi(`cart/me`, {}, sid)

		return res || {}
	} catch (e) {
		throw error(e.status, e.message)
	}
}

export const updateCart = async ({
	cartId,
	billingAddress,
	email,
	shippingAddress,
	cookies,
	sid = null
}: any) => {
	try {
		const body = {
			billing_address: {
				address_1: billingAddress.address_1,
				address_2: billingAddress.address_2,
				city: billingAddress.city,
				// country_code: billingAddress.country_code,
				country_code: billingAddress.country || 'in',
				first_name: billingAddress.first_name,
				landmark: billingAddress.landmark,
				last_name: billingAddress.last_name,
				phone: billingAddress.phone,
				postal_code: billingAddress.postal_code,
				province: billingAddress.province
			},
			email: billingAddress.email,
			shipping_address: {
				address_1: shippingAddress.address_1,
				address_2: shippingAddress.address_2,
				city: shippingAddress.city,
				// country_code: shippingAddress.country_code,
				country_code: shippingAddress.country || 'in',
				first_name: shippingAddress.first_name,
				landmark: shippingAddress.landmark,
				last_name: shippingAddress.last_name,
				phone: shippingAddress.phone,
				postal_code: shippingAddress.postal_code,
				province: shippingAddress.province
			},
		}
		// console.log('body', body);
		// console.log('cartId', cartId);

		let res: any = {}

		if (cartId) {
			const res_data = await postMedusajsApi(`carts/${cartId}`, body, sid)

			res = mapMedusajsCart(res_data?.cart)

			return res || {}
		}
	} catch (e) {
		// console.error(e)
		throw error(e.status, e.message)
	}
}

