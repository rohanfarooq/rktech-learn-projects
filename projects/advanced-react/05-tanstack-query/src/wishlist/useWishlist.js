import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getWishlist, toggleWishlist } from './wishlistApi.js'

export function useWishlist() {
  return useQuery({ queryKey: ['wishlist'], queryFn: getWishlist })
}

export function useToggleWishlist() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: toggleWishlist,
    // the wishlist changed on the "server": mark our copy as old and refetch it
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['wishlist'] }),
  })
}
