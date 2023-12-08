"""Synthesizes speech from the input string of text."""
def synthesize_text(thai, english, sound_clip_path):
    import google.cloud.texttospeech as texttospeech

    client = texttospeech.TextToSpeechClient()

    input_text = texttospeech.SynthesisInput(text=thai)

    # Note: the voice can also be specified by name.
    # Names of voices can be retrieved with client.list_voices().
    voice = texttospeech.VoiceSelectionParams(
        language_code="th-TH",
        ssml_gender=texttospeech.SsmlVoiceGender.FEMALE,
    )

    audio_config = texttospeech.AudioConfig(
        audio_encoding=texttospeech.AudioEncoding.MP3
    )

    response = client.synthesize_speech(
        request={"input": input_text, "voice": voice, "audio_config": audio_config}
    )

    # The response's audio_content is binary.
    with open(sound_clip_path + english + ".m4a", "wb") as out:
        out.write(response.audio_content)
        print('Audio content written to file: ' + sound_clip_path + english + '.m4a')

"""Reads json file and uses synthesize text if we want to translate it and if the sound clip does not already exist"""
def read_json_file(filename):
   import json
   from os.path import exists
   f = open(filename,)
   data = json.load(f)
   translated = False
   sound_clip_path = "public/assets/sounds/"
   for item in data:
      if item['generate_sound_clip'] and not exists(sound_clip_path + item['english'] + ".m4a"):
         synthesize_text(item['thai'],item['english'],sound_clip_path)
         print('translating... ', item['thai'], '(', item['english'], ')')
         translated = True
   f.close()

   if not translated:
      print('nothing translated. done.')
   else:
      print('done.')

read_json_file('src/data/phrases.json')
