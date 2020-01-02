import React, { Fragment } from 'react'
import { StatusBar, Text, ScrollView, Image, StyleSheet, Linking, View } from 'react-native'
import { Button, Caption, Headline, Subheading, Divider, Paragraph } from 'react-native-paper'
import DeviceInfo from 'react-native-device-info'
import Icon from 'react-native-vector-icons/FontAwesome5'
import theme, { sharedStyles } from '../styles'
import { translate } from '../i18n'
import storage from '../models/storage'
import { METROBUS_STORAGE_KEY } from './Transit'
import SimpleToast from '../components/SimpleToast'

const ICON_SIZE = 18
const BUILD_NUMBER = DeviceInfo.getBuildNumber()
const APP_VERSION = DeviceInfo.getVersion()
const TWITTER_BASE_URL = 'twitter://'
const TWEET =
  'intent/tweet?in_reply_to=1212203981080072198?text=Yo%20tambi%C3%A9n%20apoyo%20a%20Transporte%20CDMX.%20%40LaAgenciaCDMX%20y%20%40PPmerino%20deber%C3%ADan%20apoyar%20este%20proyecto'

const openSourceLink = () => {
  Linking.openURL('https://github.com/code-for-mexico/transporteCDMX')
}

const contactADIP = () => {
  Linking.openURL('mailto:infoadip@cdmx.gob.mx?subject=Soporte%20Transporte%20CDMX')
}

const contactTransportCDMX = () => {
  Linking.openURL('mailto:transporte@codeformexico.com?subject=Soporte%20Transporte%20CDMX')
}

const sendWebTweet = () => {
  Linking.openURL(`https://twitter.com/${TWEET}`)
}

const supportTweet = () => {
  Linking.canOpenURL(TWITTER_BASE_URL)
    .then(isSupported => {
      if (isSupported) {
        Linking.openURL(`twitter://${TWEET}`)
      } else {
        sendWebTweet()
      }
    })
    .catch(sendWebTweet)
}

const deleteCache = async () => {
  try {
    await storage.set(METROBUS_STORAGE_KEY, '')
    SimpleToast(translate('success'))
  } catch {
    SimpleToast(translate('error'))
  }
}

const Acknowledgments = () => {
  return (
    <Fragment>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.primary} />
      <ScrollView style={sharedStyles.p3}>
        <Headline style={[sharedStyles.mb3, sharedStyles.textAlignCenter]}>
          Code for Mexico
        </Headline>
        <Image style={styles.image} source={require('../assets/images/programming_code.png')} />
        <Paragraph style={[sharedStyles.mt3, sharedStyles.textAlignCenter]}>
          {translate('code_for_mexico_project')}
        </Paragraph>
        <Paragraph style={[sharedStyles.my3, sharedStyles.textAlignCenter]}>
          {translate('support_us_with_tweet')}
        </Paragraph>
        <Button onPress={supportTweet} color={theme.colors.accent}>
          {translate('send_support_tweet')}
        </Button>
        <Divider style={[sharedStyles.mt6, sharedStyles.mb3]} />
        <Subheading style={sharedStyles.mb2}>{translate('our_team')}</Subheading>
        <Paragraph>{`${translate('main_maintainer')}: @kernel_init (Twitter)`}</Paragraph>
        <Paragraph>{`${translate('collaborator')}: @kernel_init (Twitter)`}</Paragraph>
        <Subheading style={[sharedStyles.mt3, sharedStyles.mb2]}>
          {translate('special_thanks')}
        </Subheading>
        <Caption>{translate('images')}</Caption>
        <Paragraph>@ndetito (Instagram - Corralones)</Paragraph>
        <Paragraph>@alexistostado (Unsplash - Verificentros)</Paragraph>
        <Paragraph>manypixels.co</Paragraph>
        <Caption style={sharedStyles.mt3}>{translate('open_source_code')}</Caption>
        <View style={[sharedStyles.flexDRow, sharedStyles.alignItemsCenter]}>
          <Paragraph style={styles.link} onPress={openSourceLink}>
            GitHub
          </Paragraph>
          <Icon style={sharedStyles.pl2} name="github" size={ICON_SIZE} brands />
        </View>
        <Caption style={sharedStyles.mt3}>{translate('contact_support')}</Caption>
        <Paragraph onPress={contactADIP} style={styles.link}>
          {translate('government_support')}
        </Paragraph>
        <Paragraph onPress={contactTransportCDMX} style={[styles.link, sharedStyles.pt2]}>
          {translate('app_support')}
        </Paragraph>
        <View style={[sharedStyles.my6, sharedStyles.justifyContentCenter]}>
          <Caption style={sharedStyles.textAlignCenter}>{APP_VERSION}</Caption>
          <Caption style={sharedStyles.textAlignCenter}>{BUILD_NUMBER}</Caption>
          <Button onPress={deleteCache} color={theme.colors.accent}>
            {translate('delete_cache')}
          </Button>
        </View>
      </ScrollView>
    </Fragment>
  )
}

const styles = StyleSheet.create({
  image: {
    height: 200,
    width: '100%',
    resizeMode: 'contain',
  },
  link: {
    textDecorationLine: 'underline',
  },
})

export default Acknowledgments
