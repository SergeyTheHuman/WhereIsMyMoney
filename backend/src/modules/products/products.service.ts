import {
	ForbiddenException,
	Injectable,
	InternalServerErrorException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { errors } from 'src/common/errors'
import { UsersService } from '../users/users.service'
import { CreateProductDto, UpdateProductDto } from './dto'
import { Product } from './models'
import { ProductResponse } from './responses'

@Injectable()
export class ProductsService {
	constructor(
		@InjectModel(Product) private readonly productRepository: typeof Product,
		private readonly usersService: UsersService,
	) {}

	async getAll(email: string): Promise<ProductResponse[]> {
		let error = new InternalServerErrorException(errors.SOMETHING_WRONG)
		try {
			const currentUserId = await this.usersService.getUserIdByEmail(email)

			return this.productRepository.findAll({
				where: {
					user_id: currentUserId,
				},
				attributes: {
					exclude: ['createdAt', 'updatedAt', 'user_id'],
				},
			})
		} catch (e) {
			throw error
		}
	}

	async getAllByCategory(
		email: string,
		category_id: number,
	): Promise<ProductResponse[]> {
		let error = new InternalServerErrorException(errors.SOMETHING_WRONG)
		try {
			const currentUserId = await this.usersService.getUserIdByEmail(email)

			return this.productRepository.findAll({
				where: {
					user_id: currentUserId,
					category_id,
				},
				attributes: {
					exclude: ['createdAt', 'updatedAt', 'user_id'],
				},
			})
		} catch (e) {
			throw error
		}
	}

	async create(
		email: string,
		dto: CreateProductDto,
	): Promise<ProductResponse> {
		let error = new InternalServerErrorException(errors.SOMETHING_WRONG)
		try {
			const currentUserId = await this.usersService.getUserIdByEmail(email)

			const product = {
				user_id: currentUserId,
				category_id: dto.category_id,
				name: dto.name,
				price: dto.price,
			}

			const newProduct = await this.productRepository.create(product)
			return { ...dto, id: newProduct.id }
		} catch (e) {
			throw error
		}
	}

	async getProductById(id: number): Promise<Product> {
		let error = new InternalServerErrorException(errors.SOMETHING_WRONG)
		try {
			return this.productRepository.findOne({ where: { id } })
		} catch (e) {
			throw error
		}
	}

	async isProductOwner(productId: number, email: string) {
		const currentUserId = await this.usersService.getUserIdByEmail(email)
		const currentProduct = await this.getProductById(productId)

		return currentProduct.user_id === currentUserId
	}

	async update(
		id: number,
		dto: UpdateProductDto,
		email: string,
	): Promise<ProductResponse> {
		let error = new InternalServerErrorException(errors.SOMETHING_WRONG)
		try {
			const isProductOwner = this.isProductOwner(id, email)

			if (!isProductOwner) {
				error = new ForbiddenException(errors.NO_ACCESS)
				throw new Error()
			}

			await this.productRepository.update(dto, {
				where: {
					id,
				},
			})

			return { ...dto, id }
		} catch (e) {
			throw error
		}
	}

	async delete(id: number, email: string): Promise<boolean> {
		let error = new InternalServerErrorException(errors.SOMETHING_WRONG)
		try {
			const isProductOwner = this.isProductOwner(id, email)

			if (!isProductOwner) {
				error = new ForbiddenException(errors.NO_ACCESS)
				throw new Error()
			}

			return !!this.productRepository.destroy({
				where: {
					id,
				},
			})
		} catch (e) {
			throw error
		}
	}
}
