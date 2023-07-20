import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { ColorService } from 'modules/users/services/color.service'
import { UsersService } from 'modules/users/services/users.service'

import { Color } from 'modules/users/entities/color.entity'
import { Place } from '../entities/place.entity'

import { CreatePlaceDto, UpdatePlaceDto } from '../dtos/place.dto'

@Injectable()
export class PlacesService {
	constructor(
		@InjectRepository(Place) private placeRepo: Repository<Place>,
		private userService: UsersService,
		private colorService: ColorService,
	) {}

	async findById(id: string): Promise<Place> {
		const place: Place = await this.placeRepo.findOne({
			where: {
				id,
			},
			relations: ['color'],
		})

		if (!place) {
			throw new NotFoundException(`Place #${id} not found`)
		}

		return place
	}

	async findByName(text: string, id_user: string) {
		const placesUser: Place[] = await this.userService.findPlaces(id_user)

		const existPlace = placesUser.find((place) => place.name === text)

		if (Object.keys(existPlace).length === 0) {
			throw new NotFoundException(`Place with name:"${text}" not found`)
		}

		return existPlace
	}

	async create(id_user: string, payload: CreatePlaceDto): Promise<Place> {
		const user = await this.userService.findAccount(id_user)

		let existPlace: object = {}

		try {
			existPlace = await this.findByName(payload.name, id_user)
		} catch {}

		if (Object.keys(existPlace).length > 0) {
			throw new ConflictException(`Place with name:"${payload.name}" existed`)
		}

		const color = await this.colorService.findColorByCode(payload.code)

		const newPlace = this.placeRepo.create(payload)

		newPlace.color = color
		newPlace.user = user

		const isPlace = this.placeRepo.save(newPlace)

		return isPlace
	}

	async update(id: string, payload: UpdatePlaceDto, id_user: string) {
		const updatePlace: Place = await this.findById(id)

		if (payload.code) {
			const color: Color = await this.colorService.findColorByCode(payload.code)

			updatePlace.color = color
		}

		if (payload.name) {
			let existPlace: object = {}

			try {
				existPlace = await this.findByName(payload.name, id_user)
			} catch {}

			if (Object.keys(existPlace).length > 0) {
				throw new ConflictException(`Place with name:"${payload.name}" existed`)
			}

			updatePlace.name = payload.name
		}

		return this.placeRepo.save(updatePlace).catch((e) => e)
	}

	async remove(id: string) {
		await this.findById(id)

		return this.placeRepo.delete(id).catch((e) => e)
	}
}
