import { ForbiddenException, Injectable, InternalServerErrorException } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { errors } from 'src/common/errors'
import { UsersService } from '../users/users.service'
import { CreateCategoryDto, UpdateCategoryDto } from './dto'
import { Category } from './models'
import { CategoryResponse } from './responses'

@Injectable()
export class CategoriesService {
	constructor(
		@InjectModel(Category)
		private readonly categoryRepository: typeof Category,
		private readonly usersService: UsersService,
	) {}

	async update(
		id: number,
		dto: UpdateCategoryDto,
		email: string,
	): Promise<CategoryResponse> {
			let error = new InternalServerErrorException(errors.SOMETHING_WRONG)
			try {
				const isProductOwner = this.isCategoryOwner(id, email)
	
				if (!isProductOwner) {
					error = new ForbiddenException(errors.NO_ACCESS)
					throw new Error()
				}
	
				await this.categoryRepository.update(dto, {
					where: {
						id,
					},
				})
	
				return dto
			} catch (e) {
				throw error
			}
	}

	async isCategoryOwner(categoryId: number, email: string) {
		const currentUserId = await this.usersService.getUserIdByEmail(email)
		const currentCategory = await this.getCategoryById(categoryId)

		return currentCategory?.user_id === currentUserId
	}

	async getCategoryById(id: number){
		let error = new InternalServerErrorException(errors.SOMETHING_WRONG)
		try {
			return this.categoryRepository.findOne({ where: { id } })
		} catch (e) {
			throw error
		}
	}

	async delete(id: number, email: string): Promise<boolean> {
		let error = new InternalServerErrorException(errors.SOMETHING_WRONG)
		try {
			const isProductOwner = this.isCategoryOwner(id, email)

			if (!isProductOwner) {
				error = new ForbiddenException(errors.NO_ACCESS)
				throw new Error()
			}

			let isDeleted = !!this.categoryRepository.destroy({
				where: {
					id,
				},
			})

			if (isDeleted) this.setFieldsToNull(id)

			return isDeleted
		} catch (e) {
			throw error
		}
	}

	async setFieldsToNull(categoryId: number) {
		//TODO: сделать обновление всех продуктов с выставлением категории в NULL
	}

	async getAll(email: string): Promise<CategoryResponse[]> {
		let error = new InternalServerErrorException(errors.SOMETHING_WRONG)
		try {
			const currentUserId = await this.usersService.getUserIdByEmail(email)

			return this.categoryRepository.findAll({
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

	async create(
		email: string,
		dto: CreateCategoryDto,
	): Promise<CategoryResponse> {
		let error = new InternalServerErrorException(errors.SOMETHING_WRONG)
		try {
			const currentUserId = await this.usersService.getUserIdByEmail(email)
			
			const category = {
				user_id: currentUserId,
				name: dto.name,
			}
			
			await this.categoryRepository.create(category)
			return dto
		} catch (e) {
			throw error
		}
	}
}
