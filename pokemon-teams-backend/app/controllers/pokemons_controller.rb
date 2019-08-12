require 'faker'

class PokemonsController < ApplicationController
  def create
    unless pokemon_params[:trainer_id].nil?
      default = {}

      if Trainer.find(pokemon_params[:trainer_id]).pokemons.count < 6
        if pokemon_params[:nickname].nil?
          default[:nickname] = "Sam"
        end

        if pokemon_params[:species].nil?
          default[:species] = "Caterpie"
        end

        @pokemon = Pokemon.create(pokemon_params.merge(default))
        render json: @pokemon, status: 201
      else
        render json: { error: "Party is Full!"}, status: 403
      end
    else
      render json: { error: "Trainer not found"}, status: 404
    end
  end

  def destroy
    @pokemon = Pokemon.find(params[:id])
    unless @pokemon.nil?
      @pokemon.destroy
      render json: @pokemon
    else
      render json: { error: "Pokemon not Found!" }, status: 404
    end
  end

  private
  def pokemon_params
    params.permit(:nickname, :species, :trainer_id)
  end
end
