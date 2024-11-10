import { useFlags } from 'launchdarkly-react-client-sdk'

export enum LDFlagKey {
  membership0_to_49_000 = 'membership-0-49_000',
  membership50_000_to_99_000 = 'membership-50_000-99_000',
  membership100_000_to_149_000 = 'membership-100_000-149_000',
}

const calc: { [key: number]: LDFlagKey } = {
  1: LDFlagKey.membership0_to_49_000,
  2: LDFlagKey.membership50_000_to_99_000,
  3: LDFlagKey.membership100_000_to_149_000,
}

function getFlagKey(userIndex: number) {
  const flagIndex = Math.floor(userIndex / 50_000)
  return calc[flagIndex]
}

const useFlagFor = (userIndex: number) => {
  const flagKey = getFlagKey(userIndex)
  const allFlags = useFlags()
  return allFlags[flagKey]
}

async function updateFlag(flagKey: LDFlagKey) {
  const ENVIRONMENT_KEY = 'test'

  const resp = await fetch(
    `https://app.launchdarkly.com/api/v2/flags/${
      import.meta.env.VITE_LD_PROJECT_KEY
    }/${ENVIRONMENT_KEY}/${flagKey}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: import.meta.env.VITE_LD_API_KEY,
      },
      body: JSON.stringify({
        patch: [
          {
            op: 'replace',
            path: '/variations',
            value: [
              {
                value: true,
                name: 'Variation 1',
                _id: '86208e6e-468f-4425-b334-7f318397f95c',
              },
              {
                value: false,
                name: 'Variation 2',
                _id: '7b32de80-f346-4276-bb77-28dfa7ddc2d8',
              },
            ],
          },
        ],
      }),
    }
  )

  const data = await resp.json()
  console.log(data)
}
