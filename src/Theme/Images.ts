import { ThemeImages } from '@/Theme/theme.type'

/**
 *
 * @param Theme can be spread like {Colors, NavigationColors, Gutters, Layout, Common, ...args}
 * @return {*}
 */
export default function (): ThemeImages {
  return {
    logo: require('@/Assets/Images/TOM.png'),
    construction: require('@/Assets/Images/under_construction.png'),
  }
}
